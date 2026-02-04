import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  private generateSetNumber(): number {
    return Math.floor(Math.random() * 1000000);
  }

  async initiatePayment(body: { email: string }) {
    const record = await this.prisma.programRegistration.findUnique({
      where: { email: body.email },
    });

    if (!record) {
      throw new Error('Record not found');
    }

    return {
      email: record.email,
      paymentStatus: record.paymentStatus,
    };
  }

  async confirmPayment(body: { email: string }) {
    const updated = await this.prisma.programRegistration.update({
      where: { email: body.email },
      data: {
        paymentStatus: 'PAID',
        approvalStatus: 'APPROVED',
        setNumber: this.generateSetNumber(),
      },
    });

    return {
      email: updated.email,
      paymentStatus: updated.paymentStatus,
      approvalStatus: updated.approvalStatus,
      setNumber: updated.setNumber,
    };
  }

  async checkStatus(email: string) {
    const record = await this.prisma.programRegistration.findUnique({
      where: { email },
    });

    if (!record) {
      throw new Error('Record not found');
    }

    return {
      email: record.email,
      paymentStatus: record.paymentStatus,
      approvalStatus: record.approvalStatus,
      setNumber: record.setNumber,
    };
  }
}
