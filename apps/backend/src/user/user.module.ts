import { Module } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { UsersRepository } from "./users.repository";

@Module({
  providers: [PrismaService, UsersRepository],
  exports: [UsersRepository]
})
export class UserModule {
}
