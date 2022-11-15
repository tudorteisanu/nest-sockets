import { Body, Controller, Get, Post, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ToBooleanPipe } from './to-boolean.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return '';
  }

  @Post('make-call')
  @Render('index')
  sendAnonymous(
    @Body() body,
    @Query('existing', ToBooleanPipe)
    existing = true,
  ) {
    this.appService.makeCall({ ...body, existing });
    return { message: `Start call!, existing: ${existing}` };
  }

  @Post('operator/pause')
  @Render('index')
  pauseOperator(@Body() { operator }) {
    this.appService.pauseOperator(operator);
    return { message: 'Paused operator!' };
  }

  @Post('operator/unpause')
  @Render('index')
  unpauseOperator(@Body() { operator }) {
    this.appService.unpauseOperator(operator);
    return { message: 'Unpause operator!' };
  }
}
