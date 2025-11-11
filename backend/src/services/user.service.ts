import {injectable, inject, BindingScope} from '@loopback/core';
import {UserRepository} from '../repositories';
import {repository} from '@loopback/repository';
import {Filter} from '@loopback/repository';
import {User} from '../models';
import {HttpErrors} from '@loopback/rest';
import {HashPasswordService} from '../util/hashpassword.util';
import {AuthService} from './auth.service';
import { SessionService } from './session.service';
import { SessionRepository } from '../repositories';
import { UserPayload } from '../interface/userPayload';
@injectable({scope: BindingScope.TRANSIENT})
export class UserService {
  constructor(
    @repository(UserRepository)
    private userRepo: UserRepository,
    @inject('services.HashPasswordService')
    private hasPassword: HashPasswordService,
    @inject('services.AuthService') 
    private authService: AuthService,
    @inject('services.SessionService')
    private sessionService: SessionService,
    @repository(SessionRepository)
    private sessionRepo: SessionRepository
  ) {}
  async getUsers(filters?: Filter<User>): Promise<User[]> {
    return await this.userRepo.find(filters);
  }
  async getUserById(id: string): Promise<User> {
    return await this.userRepo.findById(id);
  }
  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    const user: User = new User({
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await this.userRepo.create(user);
  }
  async register(
    userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ) {
    const {email, password} = userData;
    const existed = await this.userRepo.findOne({where: {email: email}});
    if (existed) {
      throw HttpErrors.Conflict('Người dùng này đã tồn tại');
    }
    const hashedPassword = await this.hasPassword.hashPassword(password);
    userData.password = hashedPassword;
    const user = await this.userRepo.create(userData);
    const payload = {
      id: user.id,
      roles: user.roles
    }
    const accessToken = await this.authService.generateAccessToken(payload);
    const refreshToken = await this.authService.generateRefreshToken(payload);
    return {user,accessToken,refreshToken}
  }
  async login(email: string, password: string) {
    const existUser = await this.userRepo.findOne({where: {email: email}});
    if (!existUser || !this.hasPassword.comparePassword(password, existUser.password)) {
      throw new HttpErrors.BadRequest('Email hoặc mật khẩu không đúng');
    }
        const payload: UserPayload = {
      id: existUser.id,
      roles: existUser.roles
    }
    const session = this.sessionRepo.find({where: {userId: existUser.id}});
    if(!session){
      throw HttpErrors.Conflict("User này đã đăng nhập")
    };
    const user = {
      id: existUser.id,
      name: existUser.name,
      email:existUser.email,
      createdAt:existUser.createdAt,
      updatedAt:existUser.updatedAt
    }
    const accessToken = this.authService.generateAccessToken(payload);
    const refreshToken = this.authService.generateRefreshToken(payload);
    await this.sessionService.createSession(user.id,refreshToken);
    return {user, accessToken, refreshToken};
  }
  async logout(refreshToken: string){
    if(!refreshToken) return;
    return await this.sessionService.deleteSession(refreshToken);
  }
  async refreshAccessToken(
    refreshToken: string
  ) {
    const session = await this.sessionRepo.findOne({
      where: {refreshToken: refreshToken},
    });
    if(!session){
      throw new HttpErrors.Unauthorized("Token này không hợp lệ")
    }
    if(session.expiresAt && new Date(session.expiresAt) < new Date()){
      await this.sessionRepo.deleteById(session.id);
      throw new HttpErrors.Unauthorized("Token này đã hết hạn")
    }
    const existUser = await this.userRepo.findById(session.userId);
    if(!existUser){
      throw new HttpErrors.Unauthorized("Không tìm thấy user của session")
    }
    const accessToken = await this.authService.generateAccessToken({id: existUser.id, roles: existUser.roles});
    const newRefreshToken = await this.authService.generateRefreshToken({id: existUser.id, roles: existUser.roles});
    // const newExpiresDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const newExpiresDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const user = {
      name: existUser.name,
      email:existUser.email,
      roles:existUser.roles
    }
    await this.sessionRepo.updateById(session.id, {
      refreshToken: newRefreshToken,
      expiresAt: newExpiresDate,
    });
    return {accessToken, newRefreshToken,user};
  }
  
}
