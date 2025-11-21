import jwt, {JwtPayload} from 'jsonwebtoken';
import { UserPayload } from '../models';
import { HttpErrors } from '@loopback/rest';

export class AuthService {
  private readonly jwtSecret: string;

  constructor(){
    const secret = process.env.SECRET_STR;
    if(!secret){
      throw new Error("Secret is not defined!")
    };
    this.jwtSecret = secret;
  }

  generateAccessToken(payload: UserPayload) : string {
    return jwt.sign(payload, this.jwtSecret, {expiresIn: "1h"});
  }

  generateRefreshToken(payload: UserPayload) {
    return jwt.sign(payload, this.jwtSecret, {expiresIn: "7d"});
  }

 verifyAccessToken(token: string): UserPayload {
    try {
      console.log("Access Token này:", token);
      const decoded = jwt.verify(token, this.jwtSecret) as JwtPayload;

      if (!decoded || typeof decoded !== 'object' || !decoded.id || !decoded.roles) {
        throw new HttpErrors.Unauthorized('Token payload không hợp lệ');
      }

      // trả về đúng kiểu UserPayload
      return {
        id: decoded.id as string,
        roles: decoded.roles as string[],
      };
    } catch (err: any) {
      console.log("Lỗi access: ",err);
      if (err.name === 'TokenExpiredError') {
        throw new HttpErrors.Unauthorized('Access token đã hết hạn');
      }
      if (err.name === 'JsonWebTokenError') {
        throw new HttpErrors.Unauthorized('Access token không hợp lệ');
      }
      throw new HttpErrors.Unauthorized('Lỗi khi xác thực access token: ' + err.message);
    }
  }

  verifyRefreshToken(token: string): UserPayload {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as JwtPayload;
      console.log("RefreshTOken này:", token);
      if (!decoded || typeof decoded !== 'object' || !decoded.id || !decoded.roles) {
        throw new HttpErrors.Unauthorized('Refresh token payload không hợp lệ');
      }

      return {
        id: decoded.id as string,
        roles: decoded.roles as string[],
      };
    } catch (err: any) {
      console.log("Lỗi refresh: ",err )
      if (err.name === 'TokenExpiredError') {
        throw new HttpErrors.Unauthorized('Refresh token đã hết hạn');
      }
      if (err.name === 'JsonWebTokenError') {
        throw new HttpErrors.Unauthorized('Refresh token không hợp lệ');
      }
      throw new HttpErrors.Unauthorized('Lỗi khi xác thực refresh token: ' + err.message);
    }
  }
  

}
