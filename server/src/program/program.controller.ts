import { Controller, Post, Body } from '@nestjs/common';
import { ProgramService } from './program.service';

@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.programService.register(body);
  }
}
