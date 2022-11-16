import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiParam } from '@nestjs/swagger';
import { NewCallDto } from './new-call.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index() {
    return '';
  }

  @Post('make-call')
  @HttpCode(HttpStatus.OK)
  makeCall(@Body() body: NewCallDto) {
    return this.appService.makeCall(body);
  }

  @ApiParam({ name: 'operator', required: true })
  @Post('operator/:operator/pause')
  @HttpCode(HttpStatus.OK)
  pauseOperator(@Param('operator') operator) {
    return this.appService.pauseOperator(operator);
  }

  @ApiParam({ name: 'operator', required: true })
  @Post('operator/:operator/unpause')
  @HttpCode(HttpStatus.OK)
  unpauseOperator(@Param('operator') operator) {
    return this.appService.unpauseOperator(operator);
  }
}
