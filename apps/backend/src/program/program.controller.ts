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
    @Body() body: any,
    @UploadedFile() file?: Express.Multer.File
  ) {
    let email: string | null = null;
    let fullName: string | null = null;

    // Handle JSON request
    if (typeof body.email === 'string') email = body.email;
    if (typeof body.fullName === 'string') fullName = body.fullName;

    // Handle multipart weird wrapping
    if (!email && typeof body?.email?.email === 'string') {
      email = body.email.email;
    }

    if (!fullName && typeof body?.email?.fullName === 'string') {
      fullName = body.email.fullName;
    }

    if (!email || !fullName) {
      throw new Error('Invalid request body: email/fullName missing');
    }

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
