import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { UserObjBase } from "./register/RegisterInput";
import bcrypt from "bcryptjs";
import { UserModel } from "../../models/Users";
import { MyContext } from "../../types/MyContext";


@InputType()
export class UserLoginInputs {
    @Field()
    email: String

    @Field()
    password: String
}

@Resolver()
export class loginResolver {
  @Mutation(() => UserObjBase)
  async login(
    @Arg("inputs") inputs: UserLoginInputs,
    @Ctx() ctx: MyContext
  ): Promise<UserObjBase | null> {
    const user = await UserModel.findOne({email: inputs.email});

    if(!user) {
        const error = new Error( "Email is not found");
        (error as any).code = 401;
        throw error
    }

    const isMatch = await bcrypt.compare(inputs.password, user.password);

    if(!isMatch) {
        const error = new Error( "Wrong password");
        (error as any).code = 401;
        throw error  
    }

    (ctx.req.session.cookie as any).userId  = user._id.toString()
    console.log("🚀 ~ file: login.ts ~ line 41 ~ loginResolver ~ (ctx.req.session as any).userId ", (ctx.req.session as any).userId )
    
    return user;
  }
}
