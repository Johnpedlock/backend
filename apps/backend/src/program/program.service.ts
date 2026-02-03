import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentStatus, ApprovalStatus } from '@prisma/client';

@Injectable()
export class ProgramService {
  constructor(private readonly prisma: PrismaService) {}

  async register(data: any, file?: any) {
    if (!data) {
      throw new BadRequestException('Request body is missing');
    }

    const { fullName, email, phone, ministry } = data;

    if (!fullName || !email || !phone || !ministry) {
      throw new BadRequestException('Missing required fields');
    }

    // 🔹 CHECK IF EMAIL ALREADY EXISTS
    const existing = await this.prisma.programRegistration.findUnique({
      where: { email },
    });

    if (existing) {
      return {
        success: true,
        message: 'Registration already exists',
        data: existing,
      };
    }

    // 🔹 CREATE NEW REGISTRATION
    return this.prisma.programRegistration.create({
      data: {
        fullName,
        email,
        phone,
        ministry,
        paymentStatus: PaymentStatus.PENDING,
        approvalStatus: ApprovalStatus.PENDING,
      },
    });
  }

  async getStatus(email: string) {
    const record = await this.prisma.programRegistration.findUnique({
      where: { email },
    });

    if (!record) {
      return {
        success: false,
        message: 'No registration found with this email',
      };
    }

    return {
      success: true,
      data: record,
    };
  }

  async confirmPayment(email: string) {
    const record = await this.prisma.programRegistration.findUnique({
      where: { email },
    });

    if (!record) {
      throw new BadRequestException('Registration not found');
    }

    const setNumber = `GMM-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    return this.prisma.programRegistration.update({
      where: { email },
      data: {
        paymentStatus: PaymentStatus.PAID,
        approvalStatus: ApprovalStatus.APPROVED,
        approvedAt: new Date(),
        setNumber,
      },
    });
  }
}
