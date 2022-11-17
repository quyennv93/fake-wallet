import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager } from 'typeorm';

@ValidatorConstraint({ name: 'unique', async: true })
@Injectable()
export class Unique implements ValidatorConstraintInterface {
  constructor(
    @InjectEntityManager() protected readonly connection: EntityManager,
  ) {}

  async validate(value: number, args: ValidationArguments): Promise<boolean> {
    const [EntityClass, findCondition = args.property] = args.constraints;
    const data = await this.connection.getRepository(EntityClass).count({
      where:
        typeof findCondition === 'function'
          ? findCondition(args)
          : {
              [findCondition || args.property]: value,
            },
    });
    return data <= 0;
  }

  defaultMessage(args?: ValidationArguments): string {
    const [EntityClass] = args.constraints;
    const entity = EntityClass.name || 'Entity';
    return `${entity} with the same ${args.property} already exist`;
  }
}
