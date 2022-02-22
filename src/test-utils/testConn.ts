import * as mongoose from "mongoose";

const connection = mongoose.connection;

export  function dropDb(): Promise<Boolean> {
    return connection.db.dropDatabase();
}