import { Controller, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
  ) {}

  @Post(':reference/success')
  async markSuccessful(
    @Param('reference') reference: string,
  ) {
    return this.paymentService.markSuccessful(reference);
  }
}
