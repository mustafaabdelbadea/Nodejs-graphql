import {
  Arg,
  Authorized,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { UserDocuemt, UserModel } from "../../models/Users";
import { UserCreateInputs, UserObjBase } from "./register/RegisterInput";
import bcrypt from "bcryptjs";
import { isAuth } from "../middleware/isAuth";
import { logger } from "../middleware/logger";
import { sendEmail } from "../utils/sendEmail";
import { createConfirmationUrl } from "../utils/createConfirmationUrl";

@ObjectType()
class UserObj extends UserObjBase {
 fullName?: String;
 @Field(() => String, { name: "fullName" })
 nameResolver?(@Root() parent: UserDocuemt): string {
   console.log(parent);
   return `${parent.firstName} ${parent.lastName}`;
 }
}

@Resolver()
export class HelloResolver {
  @UseMiddleware(isAuth, logger)
  @Query(() => String, { name: "helloWorld" })
  async hello() {
    return "hello";
  }

  @Query(() => String, { name: "helloWossrld" })
  async helloss() {
    return "hello";
  }


  //   @Mutation(() => String, {name: "helloWorldsss"})
  //   async register (
  //       @Arg('inputs') inputs: inputs
  //   ) {
  //       return inputs
  //   }

  //   @FieldResolver(() => String)
  //   async name(@Root() parent: UserObj): Promise<String> {
  //       return `${parent.firstName} ${parent.lastName}`
  //   }
  @UseMiddleware(logger)
  @Mutation(() => UserObj)
  async register(@Arg("inputs") inputs: UserCreateInputs): Promise<UserObj> {
    const hashedPassword = await bcrypt.hash(inputs.password, 12);

    const user = await UserModel.create({
      email: inputs.email,
      password: hashedPassword,
      firstName: inputs.firstName,
      lastName: inputs.lastName,
    });

    await sendEmail(user.email, await createConfirmationUrl(user.id))
    return user
  }
}
