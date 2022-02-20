import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
const Express = require("express");
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./modules/users/Register";
const mongoose = require("mongoose");
import session from "express-session";
import { redis } from "./redis";
let RedisStore = require("connect-redis")(session);
const main = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
    nullableByDefault: true,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }: any) => ({ req }),
  });
  await apolloServer.start();

  const app = Express();

  const sessionOpts: session.SessionOptions = {
    store: new RedisStore({
      client: redis,
    }),
    name: "ay 7aga",
    secret: "asdadasdasd",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 26 * 365,
    },
  };

  app.use(session(sessionOpts));

  apolloServer.applyMiddleware({ app });

  mongoose
    .connect("mongodb://localhost:27017/typeGraphql")
    .then((result: any) => {
      app.listen(4000, () => {
        console.log("Working !! ");
      });
    })
    .catch((err: any) => console.log(err));
};

main();
