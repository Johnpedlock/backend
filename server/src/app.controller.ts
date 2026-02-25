import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('') // leave empty so it respects global prefix
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  healthCheck(): string {
    return 'OK';
  }
}
