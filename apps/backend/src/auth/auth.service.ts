import { Injectable } from '@nestjs/common';
import { UserRepository, UserService } from '../user';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { UserRegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  public async register(registrationData: UserRegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.userRepository.create({
        email: registrationData.email,
        hashedPassword: hashedPassword,
      });
      createdUser.hashedPassword = undefined;
      return createdUser;
    } catch (error) {
      // if (error?.code === PostgresErrorCode.UniqueViolation) {
      //   throw new HttpException(
      //     'User with that email already exists',
      //     HttpStatus.BAD_REQUEST,
      //   );
      // }
      // throw new HttpException(
      //   'Something went wrong',
      //   HttpStatus.INTERNAL_SERVER_ERROR,
      // );
    }
  }

  // public getCookieWithJwtToken(userId: string) {
  //   const expiresIn = this.configService.get('JWT_EXPIRATION_TIME');
  //   const payload: ITokenPayload = { userId };
  //   const token = this.jwtService.sign(payload, {
  //     secret: this.configService.get('JWT_SECRET'),
  //     expiresIn: `${expiresIn}s`,
  //   });
  //   return {
  //     accessTokenCookie: `Authentication=${token}; HttpOnly; Path=/; Max-Age=${expiresIn}`,
  //     expiresIn,
  //   };
  // }
  //
  // public getCookieWithJwtRefreshToken(userId: string) {
  //   const payload: ITokenPayload = { userId };
  //   const token = this.jwtService.sign(payload, {
  //     secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
  //     expiresIn: `${this.configService.get(
  //       'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
  //     )}s`,
  //   });
  //   const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
  //     'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
  //   )}`;
  //   return {
  //     cookie,
  //     token,
  //   };
  // }
  //
  // async updateRefreshToken(userId: string) {
  //   const { token, cookie } = this.getCookieWithJwtRefreshToken(userId);
  //   await this.userService.setCurrentRefreshToken(token, userId);
  //   return cookie;
  // }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.userRepository.findByEmail(email);
      await this.verifyPassword(plainTextPassword, user.hashedPassword);
      return user;
    } catch (error) {
      console.error('Wrong credentials provided');
      // throw new HttpException(
      //   'Wrong credentials provided',
      //   HttpStatus.BAD_REQUEST,
      // );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    console.log(isPasswordMatching);
    if (!isPasswordMatching) {
      console.error('Password not matching');
      // throw new HttpException(
      //   'Wrong credentials provided',
      //   HttpStatus.BAD_REQUEST,
      // );
    }
  }
}
