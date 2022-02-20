import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
import { UserModel } from '../../../models/Users';
  
  @ValidatorConstraint({ async: true })
  export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
    validate(email: string, args: ValidationArguments) {
      return UserModel.findOne({email: email}).then(user => {
        if (user) return false;
        return true;
      });
    }
  }
  
  export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsEmailAlreadyExistConstraint,
      });
    };
  }