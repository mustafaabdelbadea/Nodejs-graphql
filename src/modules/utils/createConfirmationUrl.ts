import jwt from 'jsonwebtoken'
export const createConfirmationUrl = async (userId: string) => {
   const token =  jwt.sign({
        data: userId
      }, 'secret', { expiresIn: 60 * 60 });

   return `http://localhost:300/user/confirm/${token}`
}