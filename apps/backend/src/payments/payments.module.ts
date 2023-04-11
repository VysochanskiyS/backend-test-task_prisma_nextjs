import { Module } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { PaymentsController } from "./payments.controller";
import { PrismaService } from "../prisma/prisma.service";
import { PaymentsRepository } from "./payments.repository";
import { UserModule } from "../user";

@Module({
  controllers: [PaymentsController],
  imports: [UserModule],
  providers: [PrismaService, PaymentsRepository, PaymentsService]
})
export class PaymentsModule {
}
