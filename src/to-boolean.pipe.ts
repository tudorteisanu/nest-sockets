import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ToBooleanPipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      return value;
    }

    return value === 'true';
  }
}
