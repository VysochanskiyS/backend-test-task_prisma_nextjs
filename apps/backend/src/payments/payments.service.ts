import { Injectable } from "@nestjs/common";
import { CreatePaymentsDto } from "./dto/create-payments.dto";
import { PrismaService } from "../prisma/prisma.service";
import { PaymentsRepository } from "./payments.repository";
import { UsersRepository } from "../user";

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private paymentsRepository: PaymentsRepository,
    private usersRepository: UsersRepository
  ) {
  }


  private getAllNames(payments: CreatePaymentsDto[]): string[] {
    const names = new Set<string>();
    for (const payment of payments) {
      names.add(payment.owe);
      names.add(payment.owed);
    }
    return Array.from(names);
  }

  async addPayments(createPaymentDto: CreatePaymentsDto[]) {
    try {
      console.log(createPaymentDto);
      const userNames = this.getAllNames(createPaymentDto);

      await this.usersRepository.createMany(userNames)
      console.log(userNames);
      const savedUsers = await this.usersRepository.findUsersByNames(userNames)
      console.log(savedUsers);
      const usersByName = new Map<string, number>();
      savedUsers.forEach((user) => usersByName.set(user.name, user.id));

      const paymentsToCreate = createPaymentDto.map((payment) => ({
        amount: payment.amount,
        oweId: usersByName.get(payment.owe),
        owedId: usersByName.get(payment.owed)
      }));
      console.log(paymentsToCreate);
      await this.paymentsRepository.createMany( paymentsToCreate );
      const payments = await this.paymentsRepository.getPayments();
      return  payments.map(dbPayment =>{
        return {
          owe: dbPayment.owe.name,
          owed: dbPayment.owed.name,
          amount: dbPayment.amount,
          id: dbPayment.id,
        }
      })
    } catch (e) {
      console.error(e);
    }
  }
}
