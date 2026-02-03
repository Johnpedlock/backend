import { Controller, Post, Body } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApprovalStatus, PaymentStatus } from '@prisma/client';

@Controller('admin')
export class AdminController {
  constructor(private prisma: PrismaService) {}

  @Post('confirm-payment')
  async confirmPayment(@Body() body: any) {
    const { email, setNumber } = body;

    if (!email || !setNumber) {
      return { error: 'email and setNumber are required' };
    }

    const record = await this.prisma.programRegistration.findUnique({
      where: { email },
    });

    if (!record) {
      return { error: 'Registration not found' };
    }

    const updated = await this.prisma.programRegistration.update({
      where: { email },
      data: {
        paymentStatus: PaymentStatus.PAID,
        approvalStatus: ApprovalStatus.APPROVED,
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
