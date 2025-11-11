import {AuthenticationStrategy} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {HttpErrors, RedirectRoute, Request} from '@loopback/rest';
import {securityId,UserProfile} from '@loopback/security';
import {AuthService} from '../services';

export class JWTAuthenticationStrategy implements AuthenticationStrategy {
  name = 'jwt';

  constructor(
    @inject('services.AuthService') public authService: AuthService,
  ) {}

  async authenticate(
    request: Request,
  ): Promise<UserProfile | RedirectRoute | undefined> {
    const token = this.extractCredentials(request);
    if (!token) {
      throw new HttpErrors.Unauthorized('Access token is missing');
    }
    try {
      const userPayload = await this.authService.verifyAccessToken(token);
      if (typeof userPayload === 'string') {
        throw new HttpErrors.Unauthorized(
          'Token payload không phải là một object',
        );
      }
       const userProfile: UserProfile = {
        [securityId]: userPayload.id,
        id: userPayload.id,
        roles: userPayload.roles,
      };
      return userProfile;
    } catch (err) {
      throw new HttpErrors.Unauthorized(
        `Lỗi khi xác nhận token ${err.message}`,
      );
    }
  }

  extractCredentials(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new HttpErrors.BadRequest(
        'Authorization header không phải là kiểu Bearer',
      );
    }
    //Lấy token
    return authHeader.substring(7);
  }
}
