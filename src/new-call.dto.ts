import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewCallDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '212' })
  operator: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '23423' })
  card: string;

  @IsBoolean()
  @ApiProperty({ example: true })
  existingClient?: boolean;
}
