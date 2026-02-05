import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgramService {
  constructor(private prisma: PrismaService) {}

  async register(email: string, fullName: string) {
    if (!email || !fullName) {
      throw new Error('Email and fullName are required');
    }

    const existing = await this.prisma.programRegistration.findUnique({
      where: { email },
    });

    if (existing) {
      return existing;
    }

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
    if (!email) {
      throw new Error('Email is required');
    }

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
    const record = await this.prisma.programRegistration.findUnique({
      where: { email },
    });

    if (!record) {
      throw new Error('Registration not found');
    }

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
