import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck(): {
    status: boolean;
    message: string;
  } {
    return {
      status: true,
      message: 'V-Count API is working...',
    };
  }
}
