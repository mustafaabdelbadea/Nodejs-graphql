import { Arg, Ctx, Field, InputType, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { UserObjBase } from "./register/RegisterInput";
import bcrypt from "bcryptjs";
import { UserModel } from "../../models/Users";
import { MyContext } from "../../types/MyContext";
import { isAuth } from "../middleware/isAuth";
import jwt_decode from "jwt-decode";


@Resolver()
export class ConfirmUserResolver {
    @Mutation(() => Boolean)
  async confirmUser(
    @Arg("token") token: string,
    @Ctx() ctx: MyContext
  ): Promise<boolean> {
    const decodedToken:{
        data,
        iat,
        exp
    } = jwt_decode(token)
    
    const userId = decodedToken.data
    console.log("🚀 ~ file: confirmUser.ts ~ line 24 ~ ConfirmUserResolver ~ userId", userId)
    await UserModel.findOneAndUpdate({_id: userId}, {confirmed: true})
    const user = await UserModel.findOne({_id: userId})
    console.log(user);
    
    return true
  }
}
