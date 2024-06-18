import { signInInputValidation } from '@/utilities/validation/validationSchema';
import CredentialsProvider from 'next-auth/providers/credentials';
import  prisma  from "@/database/prismaClient";
import bcrypt from "bcrypt";

export const NEXT_AUTH_CONFIG = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { },
            password: { },
          },
          async authorize(credentials: any) : Promise<any> {

            // TODO implement better error handling for atleast wrong password

            const enteredEmail = credentials.email;
            const enteredPassword = credentials.password;

            const validatedInputs = signInInputValidation.safeParse({email : credentials.email, password : credentials.password}).success

           if(validatedInputs){
            try {
              const fetchedUser = await prisma.user.findFirst({
                where : {
                   email : enteredEmail
              }})

              
                if (fetchedUser) {
                  const validatePassword = await bcrypt.compare(enteredPassword,fetchedUser.password);
                    if (validatePassword) {
                      return ({
                        id : fetchedUser.id,
                        email : fetchedUser.email,
                        firstName : fetchedUser.firstName
                      })
                    } else {
                      return null
                    }
                }else {
                  return null
                }
            } catch (error) {
              return null;
            }
           }
           else {
            alert("enter valid credentails");
           }
              
          },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET || "secret",
    
    callbacks: {
        jwt: async ({ user, token }: any) => {
        if (user) {
            token.uid = user.id;
            token.name = user.firstName;
        }
        return token;
        },
      session: ({ session, token }: any) => {
          if (session.user) {
              session.user.id = token.uid;
              session.user.name = token.name;
          }
          return session
      }
    },
    pages: {
        signIn: '/signin',
        error : '/error'
    }
  }