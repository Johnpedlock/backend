import { Injectable } from '@nestjs/common';

@Injectable()
export class ProgramService {
  async register(data: any) {
    console.log('Program registration received:', data);

    // Later we will save to DB (Prisma)
    return {
      success: true,
      message: 'Registration successful',
      data,
    };
  }
}
