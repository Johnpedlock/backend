import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProgramService } from './program.service';
import { RegisterDto } from './dto/register.dto';

@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('photo'))
  async register(@Body() dto: RegisterDto, @UploadedFile() file?: any) {
    return this.programService.register(dto.email, dto.fullName);
  }

  @Post('status')
  async status(@Body('email') email: string) {
    return this.programService.getStatus(email);
  }
}
