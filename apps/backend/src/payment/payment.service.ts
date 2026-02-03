import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentStatus, ApprovalStatus } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  // Start payment (just records intent for now)
  async initiatePayment(body: any) {
    const { email } = body;

    if (!email) {
      throw new Error('Email is required to initiate payment');
    }

    const record = await this.prisma.programRegistration.findUnique({
      where: { email },
    });

    if (!record) {
      throw new Error('No registration found with this email');
    }

    return {
      message: 'Payment initiated',
      email: record.email,
      amount: 30000,
      currency: 'NGN',
      paymentLink: 'https://flutterwave.com/pay/wzdsc2vvw3i8',
    };
  }

  // Manual admin confirmation of payment
  async confirmPayment(body: any) {
    const { email } = body;

    if (!email) {
      throw new Error('Email is required to confirm payment');
    }

    const updated = await this.prisma.programRegistration.update({
      where: { email },
      data: {
        paymentStatus: PaymentStatus.PAID,
        approvalStatus: ApprovalStatus.APPROVED,
        approvedAt: new Date(),
        setNumber: this.generateSetNumber(),
      },
    });

    return {
      message: 'Payment confirmed successfully',
      email: updated.email,
      setNumber: updated.setNumber,
    };
  }

  // Check status by email
  async checkStatus(email: string) {
    const record = await this.prisma.programRegistration.findUnique({
      where: { email },
    });

    if (!record) {
      return { found: false };
    }

    return {
      found: true,
      fullName: record.fullName,
      email: record.email,
      paymentStatus: record.paymentStatus,
      approvalStatus: record.approvalStatus,
      setNumber: record.setNumber,
    };
  }

  private generateSetNumber(): string {
    const random = Math.floor(100000 + Math.random() * 900000);
    return `GMM-${random}`;
  }
}
