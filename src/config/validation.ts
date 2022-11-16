import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { NestExpressApplication } from '@nestjs/platform-express';

export abstract class ClientException {
  public readonly type = 'client';

  protected constructor(
    public readonly message: string,
    public readonly errors?: Array<string>,
  ) {}
}

export const parseValidationErrors = (validationErrors: ValidationError[]) => {
  console.log(validationErrors, 'eeeeeeeeeeeeeeeeeeeeeeeee');
  return validationErrors.reduce((errors: any, error: any) => {
    if (error.children.length) {
      errors[error.property] = parseValidationErrors(error.children);
    } else {
      errors[error.property] = Object.values(error.constraints).slice(0, 1);
    }

    return errors;
  }, {});
};

export class ValidationException extends ClientException {
  constructor(errors: ValidationError[]) {
    super('Validation failed!', parseValidationErrors(errors));
  }
}

export const setupGlobalValidation = (app: NestExpressApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) =>
        new ValidationException(errors),
    }),
  );
};
