import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProgramModule } from './program/program.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    PrismaModule,
    ProgramModule,
    AdminModule,
  ],
})
export class AppModule {}
