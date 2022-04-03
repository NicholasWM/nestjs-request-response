import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import { LogginInterceptor } from './interceptors/logging.interceptor';
import { FreezePipe } from './pipes/freeze.pipe';
import { RequestService } from './request.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly requestService: RequestService) {}

  // @UseGuards(AuthGuard)
  // @UseInterceptors(LogginInterceptor)
  @Get()
  getHello(): string {
    const userId = this.requestService.getUserId();
    this.logger.log('getHello userId:', userId);
    return 'Hello World';
  }

  @Post()
  examplePost(@Body(new FreezePipe()) body: any) {
    body.test = 32;
  }

  @Get('error')
  throwError() {
    throw new InternalServerErrorException();
  }
}
