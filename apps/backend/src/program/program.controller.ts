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
    return this.programService.register(data, file);
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
