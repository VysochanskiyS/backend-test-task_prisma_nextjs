import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {
  }

  private get users() {
    return this.prisma.user;
  }

  async createMany(userNames: string[]) {
    const mappedNamesToSave = userNames.map((name) => ({
      name
    }));
    await this.users.createMany({
      data: mappedNamesToSave,
      skipDuplicates: true
    });
  }

  async findUsersByNames(userNames: string[]) {
    return this.users.findMany({
      where: {
        name: {
          in: userNames
        }
      },
      select: {
        id: true,
        name: true
      }
    });
  }

}
