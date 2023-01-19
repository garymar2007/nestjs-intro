import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/user')
  @Header('Content-Type', 'text/html')
  getUser(): { name: string } {
    return this.appService.getUser();
  }
}
