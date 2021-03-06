import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
const Express = require("express");
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./modules/users/Register";
const mongoose = require("mongoose");
import session from "express-session";
import cors from "cors";
import { loginResolver } from "./modules/users/login";
import clc from "cli-color";
import { sendEmail } from "./modules/utils/sendEmail";
import { ConfirmUserResolver } from "./modules/users/confirmUser";
import { fieldExtensionsEstimator, getComplexity, simpleEstimator } from "graphql-query-complexity";

const main = async () => {
  const schema = await buildSchema({
    resolvers: [__dirname + "/modules/**/*.ts"],
    nullableByDefault: true,
    // authChecker: (
    //   {  context: {req} }
    // ) => {
    //   return !!req.session.userId
    // }
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
    introspection: true,
    plugins: [
      {
        requestDidStart: () => ({
          didResolveOperation({ request, document }) {
            const complexity = getComplexity({
              
              schema,
              operationName: request.operationName,
              query: document,
              variables: request.variables,
              estimators: [
                fieldExtensionsEstimator(),
                simpleEstimator({ defaultComplexity: 1}),
              ],
            });
            if (complexity > 2) {
              throw new Error(
                `Sorry, too complicated query! ${complexity} is over 1 that is the max allowed complexity.`,
              );
            }
            console.log("Used query complexity points:", complexity);
          },
        }) as any,
      },
    ],
  });
  await apolloServer.start();

  const app = Express();

  // app.use(cors({
  //   credentials: true,
  //   origin: "http://localhost:3000"
  // }))

  const sessionOpts: session.SessionOptions = {
    name: "ay 7aga",
    secret: "asdadasdasd",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 26 * 365,
    },
  };

  app.use(session(sessionOpts));

  apolloServer.applyMiddleware({ app });

  //coloring console log
  var error = clc.black.bgRed.bold;
  var success = clc.black.bgGreen.bold;

  mongoose
    .connect("mongodb://localhost:27017/typeGraphql")
    .then((result: any) => {
      app.listen(4000, () => {
        console.log(success("Working !! "));
      });
    })
    .catch((err: any) => console.log(error(err)));
};

main();
