import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('admin')
export class AdminManualController {
  constructor(private prisma: PrismaService) {}

  @Post('confirm-payment')
  async confirmPayment(@Body() body: { email: string }) {
    const { email } = body;

    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const record = await this.prisma.programRegistration.findUnique({
      where: { email },
    });

    if (!record) {
      throw new BadRequestException('Registration not found');
    }

    if (record.paymentStatus === 'PAID') {
      return {
        message: 'This student is already confirmed',
        setNumber: record.setNumber,
      };
    }

    const setNumber = `GMM-${new Date().getFullYear()}-${Math.floor(
      1000 + Math.random() * 9000,
    )}`;

    const updated = await this.prisma.programRegistration.update({
      where: { id: record.id },
      data: {
        paymentStatus: 'PAID',
        approvalStatus: 'APPROVED',
        approvedAt: new Date(),
        setNumber,
      },
    });

    return {
      message: 'Payment confirmed successfully',
      fullName: updated.fullName,
      email: updated.email,
      setNumber: updated.setNumber,
    };
  }
}
