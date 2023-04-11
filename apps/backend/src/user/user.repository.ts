import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  private get user() {
    return this.prisma.user;
  }

  async create(user: Prisma.UserCreateArgs) {
    return this.user.create(user);
  }
}
