import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgramService {
  constructor(private prisma: PrismaService) {}

  private normalizeEmail(input: any): string | null {
    if (!input) return null;

    if (typeof input === 'string') return input;

    if (typeof input === 'object') {
      if (typeof input.email === 'string') return input.email;
    }

    return null;
  }

  private normalizeName(input: any): string | null {
    if (!input) return null;

    if (typeof input === 'string') return input;

    if (typeof input === 'object') {
      if (typeof input.fullName === 'string') return input.fullName;
    }

    return null;
  }

  async register(emailInput: any, fullNameInput: any) {
    const email = this.normalizeEmail(emailInput);
    const fullName = this.normalizeName(fullNameInput);

    if (!email || !fullName) {
      throw new Error('Invalid email/fullName format');
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

  async getStatus(emailInput: any) {
    const email = this.normalizeEmail(emailInput);
    if (!email) throw new Error('Invalid email');

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

  async confirmPayment(emailInput: any) {
    const email = this.normalizeEmail(emailInput);
    if (!email) throw new Error('Invalid email');

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
