import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // Create payment intent / record
  @Post('initiate')
  async initiatePayment(@Body() body: any) {
    return this.paymentService.initiatePayment(body);
  }

  // Confirm payment manually or later via API
  @Post('confirm')
  async confirmPayment(@Body() body: any) {
    return this.paymentService.confirmPayment(body);
  }

  // Check payment status by email
  @Get('status')
  async checkStatus(@Query('email') email: string) {
    if (!email) {
      return { error: 'Email is required' };
    }

    return this.paymentService.checkStatus(email);
  }
}
