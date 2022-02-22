import { Arg, ClassType, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";
import { ProductModel } from "../../models/Product";
import { UserModel } from "../../models/Users";
import { UserCreateInputs, UserObjBase } from "./register/RegisterInput";

@InputType()
export class ProductInputs {
    @Field()
    name: String
}

@ObjectType()
export class Product {

    @Field()
    name: String

    @Field() 
    _id: String
}


function createResolver<T extends ClassType, X extends ClassType>(
    suffix: string,
    returnType: T,
    inputType: X,
    model: any
     ) {
    @Resolver()
     class BaseResolver {
        @Mutation(() => returnType, {name: `create${suffix}`})
        async create( @Arg("data", ()=> inputType) data: any ){
            const outputData =  model.create(data);
            return outputData
        }
      }

      return BaseResolver;

    }
  
   export const createUserBaseResolver = createResolver("User", UserObjBase, UserCreateInputs, UserModel);
    export const craeteProduct = createResolver("Product", Product, ProductInputs, ProductModel);

// @Resolver() 
// export class CreateUerResolver extends createUserBaseResolver{
    
// }

// @Resolver() 
// export class CreateProduct extends craeteProduct{
    
// }