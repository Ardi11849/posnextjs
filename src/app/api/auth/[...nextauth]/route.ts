import axios from "axios";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                let result = await axios.post('https://api-pos-admin.digylabs.com/api/v1/auth/login', { email: email, password: password })
                    .then((response) => {
                        return response.data.data;
                    }).catch((error) => {
                        console.log(`error`, error.response);
                        if (error.response.data.message) {
                            throw error.response.data;
                            
                        } else {
                            throw error.response.data.error[0] || "Internal Server Error, Harap Hubungi Developer!" ;
                        }
                    });
                return result;
            }
        })
    ],
    pages: {
        signIn: '/'
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = user;
            }
            return token;
        },
        session: async ({ session, token }: any) => {
            if (token) {
                session.user = token.user;
            }
            return session;
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };