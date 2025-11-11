import {injectable} from '@loopback/core';
import * as bcrypt from 'bcrypt';

@injectable()
export class HashPasswordService {
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
  async comparePassword(password:string, hashed: string): Promise<boolean>{
    return bcrypt.compare(password,hashed);
  }
}