// components/Sidebar.js
'use client'
// import { FontAwesomeIcon } from '../../lib/fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import { useAnimate, stagger, motion } from "framer-motion";
import { Menus } from '../../../../global/menus';
import { storeTokenInLocalStorage } from '../../../../global/apis';
// import { getTokenFromLocalStorage, storeTokenInLocalStorage } from "../../global/apis"

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

function useMenuAnimation(isOpen: boolean, from: string) {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        animate(
            "ul" + from,
            {
                clipPath: isOpen
                    ? "inset(0% 0% 0% 0% round 10px)"
                    : "inset(10% 50% 90% 50% round 10px)"
            },
            {
                type: "spring",
                bounce: 0,
                duration: 0.5
            }
        );

        animate(
            "li" + from,
            isOpen
                ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
            {
                duration: 0.2,
                delay: isOpen ? staggerMenuItems : 0
            }
        );
    }, [isOpen]);

    return scope;
}

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [from, setFrom] = useState('');
    const scope = useMenuAnimation(isOpen, from);
    const router = useRouter()

    const { push } = useRouter();

    const redirectIfAuthenticated = async () => {
        // const isUserAuthenticated = await getTokenFromLocalStorage();
        // if (isUserAuthenticated == null || isUserAuthenticated == 'null' || isUserAuthenticated == undefined) {
        //     push('/');
        // }
    };

    useEffect(() => {
        redirectIfAuthenticated();
    }, []);

    const logout = async () => {
        storeTokenInLocalStorage('null');
        router.replace('/');
    }

    const path = usePathname();
    return (
        <nav className="menu pt-8" ref={scope}>
            {Menus.map((row, index) => (
                <div key={index}>
                    <motion.button
                        className='flex nav-item rounded text-slate-400'
                        whileTap={{ scale: 0.97 }}
                        onClick={() => { setIsOpen(!isOpen), setFrom('.' + row.id) }}
                        key={Math.random()}
                    >
                        <p className="text-sm font-bold float-left px-1 py-1">{row.labelGroup}</p>
                    </motion.button>
                    <ul key={Math.random()} className={`${row.id} ${isOpen == false && from == '.' + row.id ? 'hidden' : ''}`}>
                        {row.list.map((row2, index2) => (
                            <li key={Math.random()} className={`flex ${row.id} nav-item rounded hover:bg-blue-500 focus:ring-blue-300 ${path === row2.link ? 'text-blue-500 bg-blue-500' : ''}`}>
                                <Link href={row2.link}>
                                    <div className="px-3 py-3 float-left">
                                        {/* <FontAwesomeIcon className='w-6 h-6' icon='chart-line' /> */}
                                    </div>
                                    <p className="text-sm text-black float-left px-3 py-3">{row2.nama}</p>
                                </Link>
                            </li>
                        ))}
                        <motion.button
                            className='flex nav-item rounded text-slate-400'
                            whileTap={{ scale: 0.97 }}
                            onClick={() => { setIsOpen(!isOpen), setFrom('.logout') }}
                            key={Math.random()}
                        >
                            <p className="text-sm font-bold float-left px-1 py-1">logout</p>
                        </motion.button>
                        <li className={`flex nav-item rounded hover:bg-blue-500 focus:ring-blue-300`}>
                            <button onClick={logout}>
                                <div className="px-3 py-3 float-left">
                                    {/* <FontAwesomeIcon className='w-6 h-6' icon='right-from-bracket' />    */}
                                </div>
                                <p className="text-l text-black font-bold float-left px-3 py-3">Logout</p>
                            </button>
                        </li>
                    </ul>
                    <hr />
                </div>
            ))}
        </nav>
    );
};

export default Sidebar;