import { Controller, Post, Body } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('approve')
  async approve(@Body('email') email: string) {
    return this.prisma.programRegistration.update({
      where: { email },
      data: { approvalStatus: 'APPROVED' },
    });
  }
}
