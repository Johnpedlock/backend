import { Controller, Post, Body } from '@nestjs/common';
import { ProgramService } from './program.service';

@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post('register')
  async register(@Body() body: any) {
    const email = body?.email;
    const fullName = body?.fullName;

    if (!email || !fullName) {
      throw new Error('email and fullName are required');
    }

    return this.programService.register(email, fullName);
  }

  @Post('status')
  async checkStatus(@Body() body: any) {
    return this.programService.getStatus(body?.email);
  }

  @Post('admin/confirm-payment')
  async confirmPayment(@Body() body: any) {
    return this.programService.confirmPayment(body?.email);
  }
}
