import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgramService {
  constructor(private prisma: PrismaService) {}

  async register(email: string, fullName: string) {
    if (!email || !fullName) {
      throw new Error('Email and fullName required');
    }

    const existing = await this.prisma.programRegistration.findUnique({
      where: { email },
    });

    if (existing) return existing;

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
      return {
        email,
        paymentStatus: 'PENDING',
        approvalStatus: 'PENDING',
        setNumber: null,
      };
    }

    return record;
  }
}
