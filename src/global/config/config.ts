import axios from "axios";
import { Session } from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const isNull = (string: Session | string | null | undefined) => {
    if (string != null && string != 'null' && string != undefined && string != 'undefined' && string != '') {
        return false
    }
    return true;
}

async function refreshAccessToken(token: any) {
    try {

    let result = await axios.post('https://api-pos-admin.digylabs.com/api/v1/auth/refresh-token')
        .then((response) => {
            return response.data.data;
        }).catch((error) => {
            console.log(`error`, error.response);
            if (error.response.data.message) {
                throw error.response.data;

            } else {
                throw error.response.data.error[0] || "Internal Server Error, Harap Hubungi Developer!";
            }
        });

        const refreshedTokens = await result.json()

        if (!result.ok) {
            throw refreshedTokens
        }

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
        }
    } catch (error) {
        console.log(error)

        return {
            ...token,
            error: "RefreshAccessTokenError",
        }
    }
}

interface token {
    token: any,
    user: any
}
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
                            throw error.response.data.error[0] || "Internal Server Error, Harap Hubungi Developer!";
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
        jwt: async ({ token, user }: token) => {
            if (user) {
                return {
                  accessToken: user?.accessToken,
                  accessTokenExpires: user?.expiredAt,
                  data: user.user,
                }
            }
            return token;
        },
        session: async ({ session, token }: any) => {
            if (token) {
                session.user = token.data;
                session.accessToken = token.accessToken;
                session.accessTokenExpires = token.accessTokenExpires;
            }
            return session;
        }
    }
}