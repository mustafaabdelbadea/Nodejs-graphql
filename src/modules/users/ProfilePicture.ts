import GraphUpload from 'graphql-upload';
import { createWriteStream } from 'fs';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { Upload } from '../../types/Upload';


// @Resolver() 
// export class ProfilePictureResolver { 
//     @Mutation(() => Boolean)
//     async addProfilePicture(@Arg("picture", () => GraphUpload) {
//         createReadStream,
//         filename
//     }: Upload): Promise<boolean> {
//         return new Promise(async (resolve, reject) => {
//             createReadStream()
//             .pipe(createWriteStream(__dirname + `/../../../images/${filename}`))
//             .on("finish", () => resolve(true))
//             .on("error", () => reject(false))
//         })
//     }
// }