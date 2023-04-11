import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule, UserService } from '../user';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule],
  providers: [UserService, AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
