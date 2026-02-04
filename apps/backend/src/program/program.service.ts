import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgramService {
  constructor(private readonly prisma: PrismaService) {}

  async register(email: string, fullName: string) {
    try {
      return await this.prisma.programRegistration.create({
        data: {
          email,
          fullName,
          paymentStatus: 'PENDING',
          approvalStatus: 'PENDING',
        },
      });
    } catch (error: any) {
      // Email already exists → return existing record instead of crashing
      if (error.code === 'P2002') {
        return this.prisma.programRegistration.findUnique({
          where: { email },
        });
      }

      throw error;
    }
  }

  async getStatus(email: string) {
    const record = await this.prisma.programRegistration.findUnique({
      where: { email },
    });

    if (!record) {
      throw new ConflictException('Registration not found');
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
      data: { paymentStatus: 'PAID' },
    });
  }
}
