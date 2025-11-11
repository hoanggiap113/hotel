import {inject} from '@loopback/core';
import {
  post,
  Response,
  RestBindings,
  requestBody,
  Request,
} from '@loopback/rest';
import { getModelSchemaRef, response } from '@loopback/rest';
import {UserService} from '../services';
import {User} from '../models/user.model';
import {AuthService} from '../services';
import {SessionService} from '../services';
import {HttpErrors} from '@loopback/rest';
export class AuthController {
  constructor(
    @inject('services.UserService') private userService: UserService,
    @inject('services.AuthService') private authService: AuthService,
    @inject('services.SessionService') private sessionService: SessionService,
  ) {}

  @post('/register')
  async register(
    @requestBody({
      required: true,
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id', 'createdAt', 'updatedAt'],
          }),
        },
      },
    })
    userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
    @inject(RestBindings.Http.RESPONSE) res: Response,
  ) {
    const {user, accessToken, refreshToken} =
      await this.userService.register(userData);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return accessToken;
  }
  @post('/login')
  async login(
    @requestBody({
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
              email: {type: 'string', format: 'email'},
              password: {type: 'string'},
            },
          },
        },
      },
    })
    body: {email: string; password: string},
    @inject(RestBindings.Http.RESPONSE) res: Response,
  ) {
    const {user , refreshToken, accessToken} = await this.userService.login(
      body.email,
      body.password,
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return {user,accessToken};
  }
  @post('/logout')
  async logout(
    @inject(RestBindings.Http.REQUEST) req: Request,
    @inject(RestBindings.Http.RESPONSE) res: Response,
  ): Promise<void> {
    const refreshToken = req.cookies?.refreshToken;
    await this.userService.logout(refreshToken);

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: '/',
    })
  }
  @post('/refresh-token')
  async refreshToken(
    @inject(RestBindings.Http.REQUEST) req: Request,
    @inject(RestBindings.Http.RESPONSE) res: Response,
  ) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      throw new HttpErrors.Unauthorized('Người dùng chưa đăng nhập');
    }
    console.log(refreshToken);

    try {
      const {accessToken, newRefreshToken,user} = await this.userService.refreshAccessToken(refreshToken);
      res.cookie('refreshToken',newRefreshToken , {
        httpOnly: true,
        secure: false, 
        sameSite: 'strict',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000, 
      });
      return {accessToken,user};
    } catch (error) {

      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true, 
        sameSite: 'strict',
        path: '/',
      });
      throw new HttpErrors.Unauthorized('Invalid refresh token');
    }
  }
}
