import { Controller, Post, Body } from '@nestjs/common';
import { ProgramService } from './program.service';

@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post('register')
  async register(@Body() body: any) {
    const email = body?.email;
    const fullName = body?.fullName;

    if (typeof email !== 'string' || typeof fullName !== 'string') {
      throw new Error('Invalid request body. email and fullName must be strings.');
    }

    return this.programService.register(email, fullName);
  }

  @Post('status')
  async checkStatus(@Body() body: any) {
    const email = body?.email;

    if (typeof email !== 'string') {
      throw new Error('Invalid request body. email must be string.');
    }

    return this.programService.getStatus(email);
  }

  @Post('admin/confirm-payment')
  async confirmPayment(@Body() body: any) {
    const email = body?.email;

    if (typeof email !== 'string') {
      throw new Error('Invalid request body. email must be string.');
    }

    return this.programService.confirmPayment(email);
  }
}
