import { BadRequestException } from '@nestjs/common';

export class CustomerException extends BadRequestException {
  constructor(objectOrError?: string | object | any, description?: string) {
    super(objectOrError, description);
  }

  public static phoneExited(): CustomerException {
    return new CustomerException(' phone is available');
  }
}
