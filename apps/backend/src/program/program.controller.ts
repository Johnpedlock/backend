import { Controller, Post, Body } from '@nestjs/common';
import { ProgramService } from './program.service';

@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post('register')
  async register(@Body() body: any) {
    const email = body?.email;
    const fullName = body?.fullName;

    console.log('BODY:', body);
    console.log('EMAIL:', email, 'TYPE:', typeof email);

    if (typeof email !== 'string' || typeof fullName !== 'string') {
      throw new Error('Invalid request body. Must be flat JSON.');
    }

    return this.programService.register(email, fullName);
  }

  @Post('status')
  async status(@Body('email') email: string) {
    return this.programService.getStatus(email);
  }
}
