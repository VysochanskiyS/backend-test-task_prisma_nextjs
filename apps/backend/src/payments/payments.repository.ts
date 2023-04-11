import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PaymentsRepository {
  constructor(private prisma: PrismaService) {
  }

  private get payments() {
    return this.prisma.payments;
  }

  async createMany(paymentsToCreate: {
    amount: number
    oweId: number
    owedId: number
  }[]) {
    return this.payments.createMany({ data: paymentsToCreate});
  }

  async getPayments() {
    return this.payments.findMany({
      select: {
        owe: {
          select: {
            name: true
          }
        },
        owed: {
          select: {
            name: true
          }
        },
        amount: true,
        id: true
      }
    });
  }
}
