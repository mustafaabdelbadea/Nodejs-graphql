import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../../types/MyContext";

export const logger: MiddlewareFn<MyContext> = async ({ args }, next) => {
console.log("🚀 ~ file: logger.ts ~ line 5 ~ constlogger:MiddlewareFn<MyContext>= ~ args", args)

    
    return next();
  };