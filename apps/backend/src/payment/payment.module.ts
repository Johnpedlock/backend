import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PaymentController],
})
export class PaymentModule {}
