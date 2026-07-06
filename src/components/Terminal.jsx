"use client"

import React, { useEffect } from 'react'
import useSettingStore from '../Stores/settingStore';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import useNotificationStore from '../Stores/notificationStore';

function Terminal() {
    const settings = useSettingStore((state) => state.settings);
    const setSettings = useSettingStore((state) => state.setSettings);
    const pathname = usePathname();
    const allNotifications = useNotificationStore((state) => state.notifications);
    console.log(allNotifications, "notiff==========")


    const handleClose = () => {
        setSettings({ ...settings, isTerminalOpen: false });
    };

    // Close terminal when pathname changes
    useEffect(() => {
        if (settings.isTerminalOpen) {
            setSettings({ ...settings, isTerminalOpen: false });
        }
    }, [pathname]);

    return (
        <AnimatePresence>
            {settings.isTerminalOpen && (
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                    className='fixed z-50 bottom-0 h-72 w-full bg-black text-white border-2 border-white'
                >
                    <div className='flex border border-b-white justify-between px-2'>
                        <div>Terminal</div>
                        <button
                            onClick={handleClose}
                            className="top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-700 transition-colors"
                        > ✕ </button>
                    </div>
                    <div className='overflow-y-scroll h-full flex flex-col font-mono text-sm'>
                        {allNotifications.map((n, index) => {
                            if (n.type === 'log') {
                                // data is either a string (docker) or { percentage, message } (thread worker)
                                const text = typeof n.data === 'string'
                                    ? n.data
                                    : `${((n.data?.percentage || 0) * 100).toFixed(0)}% ${n.data?.message || ''}`.trim();
                                return <div key={index} className='px-2 w-full whitespace-pre-wrap'>{text}</div>
                            }
                            if (n.type === 'done') {
                                return <div key={index} className='px-2 w-full text-green-400'>✓ Build completed</div>
                            }
                            if (n.type === 'error') {
                                return <div key={index} className='px-2 w-full text-red-400'>✗ Build failed{n.code != null ? ` (code ${n.code})` : ''}</div>
                            }
                            return null
                        })}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Terminal