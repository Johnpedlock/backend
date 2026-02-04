import { Controller, Post, Body } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('admin/manual')
export class AdminManualController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('approve')
  async approve(
    @Body('email') email: string,
    @Body('setNumber') setNumber: number
  ) {
    const record = await this.prisma.programRegistration.findUnique({
      where: { email },
    });

    if (!record) {
      throw new Error('Record not found');
    }

    const updated = await this.prisma.programRegistration.update({
      where: { email },
      data: {
        setNumber: Number(setNumber),
        approvalStatus: 'APPROVED',
        approvedAt: new Date(),
      },
    });

    return {
      email: updated.email,
      fullName: updated.fullName,
      setNumber: updated.setNumber,
    };
  }
}
