import { Module } from '@nestjs/common';
import { ProgramController } from './program.controller';
import { ProgramService } from './program.service';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailModule } from '../common/email/email.module';

@Module({
  imports: [PrismaModule, EmailModule],
  controllers: [ProgramController],
  providers: [ProgramService],
})
export class ProgramModule {}
