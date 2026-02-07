'use client'
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";

function HomeClient({ email }) {
    const [open, setOpen] = useState(false);

    // loginHandel-->
    const loginpage = () => {
        window.location.href = '/api/auth/login';
    };

    // logoutHandel--->
    const handelLogout = async()=>{
        const result = await axios.get("/api/auth/logout");
        window.location.href = '/'
    }

    const navigate  = useRouter()

    const firstLetter = email ? email[0].toUpperCase() : "";

    return (
        <div className="relative">
            {/* ================= NAVBAR (UNCHANGED) ================= */}
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="sticky top-0 z-50 flex h-[72px] items-center justify-between 
        px-10 backdrop-blur-xl bg-white/70 border-b border-black/5"
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-2xl font-bold cursor-pointer text-gray-900"
                >
                    Support
                    <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                        AI
                    </span>
                </motion.div>

                {!email ? (
                    <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-full px-7 py-2.5 text-sm font-semibold text-white
            bg-gradient-to-r from-indigo-500 to-purple-600"
                        onClick={loginpage}
                    >
                        Login
                    </motion.button>
                ) : (
                    <div className="relative">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            onClick={() => setOpen(!open)}
                            className="h-10 w-10 rounded-full cursor-pointer
              bg-gradient-to-br from-indigo-500 to-purple-600
              flex items-center justify-center text-white font-semibold"
                        >
                            {firstLetter}
                        </motion.div>

                        <AnimatePresence>
                            {open && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    className="absolute right-0 mt-3 w-44 rounded-xl
                  bg-white/90 backdrop-blur-xl shadow-xl border border-black/5"
                                >
                                    <div className="px-4 py-3 text-sm text-gray-700 border-b border-black/5
                max-w-[180px] truncate">
                                        {email}
                                    </div>

                                    <button className="w-full px-4 py-2 text-left hover:bg-gray-100" 
                                    onClick={()=>navigate.push('/dashboard')}
                                    >
                                        Dashboard
                                    </button>
                                    <button className="w-full px-4 py-2 text-left text-red-500 hover:bg-red-50"
                                    onClick={handelLogout}
                                    >
                                        Logout
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </motion.nav>

            {/* ================= HERO SECTION ================= */}
            <section className="max-w-7xl mx-auto px-10 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                {/* Left */}
                <div>
                    <h1 className="text-5xl font-bold leading-tight text-gray-900">
                        AI Customer Support <br /> Built for Modern Websites
                    </h1>

                    <p className="mt-6 text-gray-600 max-w-lg">
                        Add a powerful AI chatbot to your website in minutes.
                        Let your customers get instant answers using your own business knowledge.
                    </p>

                    <div className="mt-8 flex gap-4">
                        <button className="px-6 py-3 rounded-lg bg-black text-white font-medium"
                        onClick={()=>navigate.push('/dashboard')}
                        >
                            Go to Dashboard
                        </button>
                        <button className="px-6 py-3 rounded-lg border text-gray-700">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Right – Chat Preview */}
                <div className="relative">
                    <div className="rounded-2xl border shadow-xl p-6 bg-white">
                        <p className="text-sm text-gray-500 mb-4">Live Chat Preview</p>

                        <div className="space-y-3">
                            <div className="ml-auto bg-black text-white px-4 py-2 rounded-lg text-sm w-fit">
                                Do you offer cash on delivery?
                            </div>
                            <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm w-fit">
                                Yes, Cash On Delivery is available.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= FLOATING CHAT BUTTON ================= */}
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                whileHover={{ scale: 1.1 }}
                className="fixed bottom-8 right-8 h-14 w-14 rounded-full
             bg-black flex items-center justify-center cursor-pointer
             shadow-xl z-50 text-white text-xl"
            >
                💬
            </motion.div>


            {/* ================= WHY SUPPORT AI ================= */}
            <section className="max-w-7xl mx-auto px-10 py-20">
                <h2 className="text-3xl font-bold text-center text-gray-900">
                    Why Businesses Choose SupportAI
                </h2>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <motion.div
                        whileHover={{ y: -6 }}
                        className="p-6 rounded-2xl border bg-white shadow-sm"
                    >
                        <h3 className="text-lg font-semibold mb-2">Plug & Play</h3>
                        <p className="text-gray-600 text-sm">
                            Integrate SupportAI into your website in minutes without any complex setup.
                        </p>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        whileHover={{ y: -6 }}
                        className="p-6 rounded-2xl border bg-white shadow-sm"
                    >
                        <h3 className="text-lg font-semibold mb-2">Admin Controlled</h3>
                        <p className="text-gray-600 text-sm">
                            Manage responses, knowledge base, and behavior directly from your dashboard.
                        </p>
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div
                        whileHover={{ y: -6 }}
                        className="p-6 rounded-2xl border bg-white shadow-sm"
                    >
                        <h3 className="text-lg font-semibold mb-2">Always Online</h3>
                        <p className="text-gray-600 text-sm">
                            Your customers get instant support 24/7 — no waiting, no tickets.
                        </p>
                    </motion.div>
                </div>
            </section>


            {/* ================= FOOTER ================= */}
            <footer className="border-t py-8 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} SupportAI. All rights reserved.
            </footer>
        </div>
    );
}

export default HomeClient;
