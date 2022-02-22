import { UserDocuemt, UserModel } from "../../../models/Users";
import { Field, InputType, ObjectType, Root } from "type-graphql";
import { IsEmailAlreadyExist, IsEmailAlreadyExistConstraint } from "./isEmailExists";

@ObjectType()
export class UserObjBase {
  @Field()
  firstName?: String;

  @Field()
  lastName?: String;

  @Field()
  email?: String;

  @Field()
  password?: String;

  @Field()
  confirmed?: Boolean;
}

@InputType()
export class UserCreateInputs {
  @Field()
  firstName?: String;

  @Field()
  lastName?: String;

  @Field()
  @IsEmailAlreadyExist({message: 'Email already in use'})
  email?: String;

  @Field()
  password?: String;

}


