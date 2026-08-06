import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Payment } from './entities/payment.entity';
import { PaymentStatus } from './enums/payment-status.enum';
import { PaymentResult } from './interfaces/payment-result.interface';
import { User } from '../user/entities/user.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async createPayment(
    user: User,
    amount: number,
    provider: string,
  ): Promise<Payment> {
    const payment = this.paymentRepository.create({
      user,
      reference: `PAY-${Date.now()}`,
      amount,
      currency: 'NGN',
      provider,
      status: PaymentStatus.PENDING,
    });

    return this.paymentRepository.save(payment);
  }

  async markSuccessful(reference: string): Promise<PaymentResult> {
    const payment = await this.paymentRepository.findOne({
      where: { reference },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    payment.status = PaymentStatus.SUCCESS;
    const saved = await this.paymentRepository.save(payment);

    return {
      reference: saved.reference,
      status: saved.status,
      amount: Number(saved.amount),
      currency: saved.currency,
    };
  }
}
