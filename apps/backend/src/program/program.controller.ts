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
  async register(
    @Body() data: any,
    @UploadedFile() file?: any
  ) {
    try {
      const email = data?.email;
      const fullName = data?.fullName;
      return await this.programService.register(email, fullName);
    } catch (error) {
      console.error('REGISTER ERROR:', error);
      throw error;
    }
  }

  @Post('status')
  async checkStatus(@Body('email') email: string) {
    try {
      return await this.programService.getStatus(email);
    } catch (error) {
      console.error('STATUS ERROR:', error);
      throw error;
    }
  }

  @Post('admin/confirm-payment')
  async confirmPayment(@Body('email') email: string) {
    try {
      return await this.programService.confirmPayment(email);
    } catch (error) {
      console.error('CONFIRM ERROR:', error);
      throw error;
    }
  }
}
