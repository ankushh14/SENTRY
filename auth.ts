import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import {PrismaAdapter} from "@auth/prisma-adapter"
import { db } from "@/lib/db"
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages:{
signIn:"/signIn",
error:"/error"
  },
  events:{
    async linkAccount({user}){
      await db.user.update({
        where:{id: user.id},
        data:{emailVerified:new Date()}
      })
    }
  },
  callbacks:{
    async signIn({user,account}){
      if(account?.provider !== "credentails") return true;
      const existingUser = await db.user.findUnique({
        where:{id:user.id}
      })
      // pervent signIn without email verfication
      if(!existingUser?.emailVerified) return false
      return true
    },
  // used this callback to added the user Id in the session token, we can also added custom feilds (Ansar)
    async session({token,session}) {
      if (token.sub && session.user){
        
        session.user.id = token.sub
        session.user.phoneNumber = token.phoneNumber // fix this  ts error
        session.user.image = token.image
      }
    
      return session 
    },
    async jwt({token }) {
      if(!token.sub) return token
   const user = await db.user.findFirst({
    where:{id:token.sub}
   })
       if(!user) return token
       token.email = user.email
       token.image = user.image
       token.name = user.name
       token.phoneNumber = user.phoneNumber
       
      return token
    }
  },
  adapter:PrismaAdapter(db),
  session:{strategy:"jwt"},
  ...authConfig,
})