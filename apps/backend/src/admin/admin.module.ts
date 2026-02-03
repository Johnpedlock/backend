import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminManualController } from './admin.manual.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AdminManualController],
})
export class AdminModule {}
