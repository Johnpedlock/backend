import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgramService {
  constructor(private readonly prisma: PrismaService) {}

  async register(email: string, fullName: string) {
    return this.prisma.programRegistration.create({
      data: {
        email,
        fullName,
        paymentStatus: 'PENDING',
        approvalStatus: 'PENDING',
      },
    });
  }

  async getStatus(email: string) {
    const record = await this.prisma.programRegistration.findUnique({
      where: { email },
    });

    if (!record) {
      throw new Error('Record not found');
    }

    return {
      email: record.email,
      fullName: record.fullName,
      paymentStatus: record.paymentStatus,
      approvalStatus: record.approvalStatus,
      setNumber: record.setNumber,
    };
  }

  async confirmPayment(email: string) {
    return this.prisma.programRegistration.update({
      where: { email },
      data: {
        paymentStatus: 'PAID',
      },
    });
  }
}
