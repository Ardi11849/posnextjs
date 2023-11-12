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
        let result = await axios({
            method: 'get',
            url: 'https://api-pos-admin.digylabs.com/api/v1/auth/refresh-token',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.accessToken
            }
        }).then((response) => {
            console.log(response);
            
            return response.data.data;
        }).catch((error) => {
            console.log(`error`, error.response);
            if (error.response.data.message) {
                return {
                    ...token,
                    message: error.response.data.message,
                    error: "RefreshAccessTokenError",
                }
            } else {
                return {
                    ...token,
                    message: "Internal Server Error, Harap Hubungi Developer!",
                    error: "RefreshAccessTokenError",
                }
            }
        });

        return {
            ...token,
            accessToken: result.accessToken,
            accessTokenExpires: result.expiredAt,
            error: result.error || '',
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
        maxAge: 60 * 60 // 4 hours
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
            /** Dari Login */
            if (user) {
                return {
                    accessToken: user?.accessToken,
                    accessTokenExpires: user?.expiredAt,
                    error: '',
                    data: user.user,
                }
            }

            /** Pengecekan Berkala Jika Token Masih Aktif Maka Return Token Sebelumnya (Lihat Srtting Di Provider.tsx) */            
            if (Date.now() < Math.floor(new Date(token.accessTokenExpires).getTime() - 10 * 60 * 1000)) {
                return token
            }

            /** Update Token Jika Expired */
            return await refreshAccessToken(token)
        },
        session: async ({ session, token }: any) => {
            if (token) {
                session.user = token.data;
                session.accessToken = token.accessToken;
                session.accessTokenExpires = token.accessTokenExpires;
                session.error = token.error;
            }
            return session;
        }
    }
}

// Convert a file to base64 string
export const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
  
      fileReader.readAsDataURL(file);
  
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
  
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };