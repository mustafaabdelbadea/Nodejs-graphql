import { Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
    return new Promise((res, rej) => {
      (ctx.req.session as any).destroy((err) => {
        if (err) {
          return rej(false);
          //throw new Error(err);
        }
        //ctx.res.clearCookie
        return res(true);
      });
    });
  }
}
