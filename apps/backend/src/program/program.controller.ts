import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProgramService } from './program.service';

@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('photo'))
  async register(@Body() data: any) {
    const email = typeof data?.email === 'string' ? data.email : data?.email?.email;
    const fullName = typeof data?.fullName === 'string' ? data.fullName : data?.email?.fullName;

    return this.programService.register(email, fullName);
  }

  @Post('status')
  async checkStatus(@Body('email') email: string) {
    return this.programService.getStatus(email);
  }

  @Post('admin/confirm-payment')
  async confirmPayment(@Body('email') email: string) {
    return this.programService.confirmPayment(email);
  }
}
