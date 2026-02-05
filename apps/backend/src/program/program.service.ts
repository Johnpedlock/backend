import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgramService {
  constructor(private prisma: PrismaService) {}

  async register(email: string, fullName: string) {
    const existing = await this.prisma.programRegistration.findUnique({
      where: { email },
    });

    if (existing) return existing;

    return this.prisma.programRegistration.create({
      data: {
        email: email,
        fullName: fullName,
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
      return {
        email,
        paymentStatus: 'PENDING',
        approvalStatus: 'PENDING',
        setNumber: null,
      };
    }

    return record;
  }

  async confirmPayment(email: string) {
    return this.prisma.programRegistration.update({
      where: { email },
      data: {
        paymentStatus: 'PAID',
        approvalStatus: 'APPROVED',
        approvedAt: new Date(),
      },
    });
  }
}
