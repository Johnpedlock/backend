import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  send(to: string, subject: string, html: string) {
    // Temporary email adapter (console-based)
    // This will later be replaced with SMTP / SendGrid / Mailgun

    this.logger.log('================ EMAIL =================');
    this.logger.log(`TO: ${to}`);
    this.logger.log(`SUBJECT: ${subject}`);
    this.logger.log(`BODY:\n${html}`);
    this.logger.log('=======================================');
  }
}
