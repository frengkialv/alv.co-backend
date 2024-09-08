import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

const SALTROUNDS = 10;

@Injectable()
export class PasswordHash {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, SALTROUNDS);
  }

  async compare(myPlaintextPassword: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(myPlaintextPassword, hash);
  }
}
