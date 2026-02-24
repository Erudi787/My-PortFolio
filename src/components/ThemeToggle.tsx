'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // useEffect only runs on the client, so now we can safely show the UI
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-10 h-10" />; // placeholder to prevent layout shift
    }

    const currentTheme = theme === 'system' ? resolvedTheme : theme;

    return (
        <button
            onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
            className="relative w-10 h-10 rounded-xl bg-[#0A4DDE]/10 dark:bg-[#00C6C6]/10 hover:bg-[#0A4DDE]/20 dark:hover:bg-[#00C6C6]/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00C6C6]/50 shadow-sm flex items-center justify-center overflow-hidden"
            aria-label="Toggle theme"
        >
            <motion.div
                initial={false}
                animate={{
                    rotate: currentTheme === 'dark' ? 0 : -90,
                    scale: currentTheme === 'dark' ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="absolute flex items-center justify-center text-[#00C6C6]"
            >
                <Moon size={20} />
            </motion.div>
            <motion.div
                initial={false}
                animate={{
                    rotate: currentTheme === 'dark' ? 90 : 0,
                    scale: currentTheme === 'dark' ? 0 : 1,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="absolute flex items-center justify-center text-[#0A4DDE]"
            >
                <Sun size={20} />
            </motion.div>
        </button>
    );
}
