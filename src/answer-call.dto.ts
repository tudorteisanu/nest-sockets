import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AnswerCallDto {
  @IsNotEmpty()
  @ApiProperty({ example: '212' })
  operator: string;
}
