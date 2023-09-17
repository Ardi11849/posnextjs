import { motion, LayoutGroup } from 'framer-motion';

export default function Loading() {
    return (
        <div className={`fixed backdrop-filter backdrop-blur-lg inset-0 z-50 flex items-center justify-center backdrop transition-opacity duration-300`}>
            <div className='rounded-lg p-6 flex items-center justify-center'>
                <motion.img
                     className="w-1/2 mr-1" 
                     src="/img/repeat.png"
                    animate={{
                        scale: [1],
                        rotate: [0, 360],
                        // borderRadius: ["0%", "0%", "50%", "50%", "0%"]
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        times: [2],
                        repeat: Infinity,
                        repeatDelay: 2
                    }}
                />
            </div>
        </div>
    )
}