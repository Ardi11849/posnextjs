'use client'

import { useEffect } from "react";
import { getTokenFromLocalStorage } from "@/global/apis"
import Login from "./auth/login"
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion';
import Footer from "./auth/footer";

export default function Home() {

    const { push } = useRouter();

    const redirectIfAuthenticated = async () => {
        const isUserAuthenticated = await getTokenFromLocalStorage();
        if (isUserAuthenticated != null && isUserAuthenticated != 'null' && isUserAuthenticated != undefined) {
            push("/dashboard")
        }
    };

    useEffect(() => {
        redirectIfAuthenticated();
    }, []);

    return (
        <main>
            <section className="relative w-full h-full py-40 min-h-screen">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div
                        className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
                        style={{
                            backgroundImage: "url('/img/register_bg_2.png')",
                        }}
                    ></div>
                    <Login />
                    <Footer absolute />
                </motion.div>
            </section>
        </main>
    )
}
