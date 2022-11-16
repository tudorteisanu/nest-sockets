import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewCallDto {
  @IsBoolean()
  @ApiProperty({ example: true })
  existingClient?: boolean;
}
