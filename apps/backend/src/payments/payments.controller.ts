import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentsDto } from './dto/create-payments.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentsDto[]) {
    return this.paymentsService.addPayments(createPaymentDto);
  }
}
