import {injectable, inject, BindingScope} from '@loopback/core';
import { SessionRepository } from '../repositories';
import { repository } from '@loopback/repository';
import { AuthService } from './auth.service';
import { HttpErrors } from '@loopback/rest';
@injectable({scope: BindingScope.TRANSIENT})
export class SessionService {
  constructor(
    @repository(SessionRepository) private sessionRepo : SessionRepository,
    @inject("services.AuthService") private authService: AuthService
  ) {}
  
  async createSession(userId:string,refreshToken: string){
    const expiresAt = new Date(Date.now() + Number(process.env.REFRESH_TOKEN_TTL));
    const session = {
      refreshToken,
      userId,
      expiresAt
    }
    return await this.sessionRepo.create(session);
  }
  async deleteSession(refreshToken: string){
    const session = await this.sessionRepo.findOne({where: {refreshToken : refreshToken}})
    if (!session) {
    throw new HttpErrors.NotFound('Session không tồn tại hoặc đã hết hạn');
  }
  return await this.sessionRepo.deleteById(session.id);
  }
}
