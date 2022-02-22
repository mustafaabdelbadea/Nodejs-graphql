import { dropDb } from "./testConn";


dropDb().then(() => {
    process.exit()
})