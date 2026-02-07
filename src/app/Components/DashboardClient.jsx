'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

function DashboardClient() {
    const navigate = useRouter()
  return (
    <div className="relative">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 flex h-[72px] items-center justify-between 
        px-10 backdrop-blur-xl bg-white/70 border-b border-black/5"
      >
        {/* Left Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-2xl font-bold cursor-pointer text-gray-900"
          onClick={()=> navigate.push('/')}
        >
          Support
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            AI
          </span>
        </motion.div>

        {/* Right Chatbot Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex items-center gap-2 rounded-full 
          bg-gradient-to-r from-indigo-500 to-purple-500 
          px-6 py-2 text-sm font-semibold text-white 
          shadow-md hover:shadow-lg"
          onClick={()=> navigate.push('/embed')}
        >
          🤖 Chatbot
        </motion.button>
      </motion.nav>
    </div>
  )
}

export default DashboardClient
