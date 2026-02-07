'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
function ChatbotSettings({ ownerId }) {
    const [suppoerEmail, setSupportEmail] = useState("")
    const [BuisnessName, setBuisnessName] = useState("")
    const [knowledge, setKnowledge] = useState("")
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if (!ownerId) return

        const fetchPrevData = async () => {
            try {
                const result = await axios.get('/api/settings/get')

                if (result.data) {
                    setBuisnessName(result.data.buisnessName || "")
                    setSupportEmail(result.data.supportEmail || "")
                    setKnowledge(result.data.knowledge || "")
                }
            } catch (error) {
                console.log("No previous settings found")
            }
        }

        fetchPrevData()
    }, [ownerId])



    const handelSubmit = async () => {
        try {
            const result = await axios.post('/api/settings', {
                ownerId,
                buisnessName: suppoerEmail,
                knowledge,
                buisnessName: BuisnessName
            })
            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="flex justify-center px-4 py-12 bg-gray-50 min-h-screen">
            <div className="w-full max-w-3xl rounded-2xl bg-white p-8 shadow-sm border border-gray-100">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        ChatBot Settings
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage your AI chatbot knowledge and business details
                    </p>
                </div>

                {/* Business Details */}
                <div className="mb-8">
                    <h2 className="mb-4 text-sm font-semibold text-gray-800">
                        Business Details
                    </h2>

                    <div className="space-y-4">
                        <input
                            onChange={(e) => setBuisnessName(e.target.value)}
                            value={BuisnessName}
                            type="text"
                            placeholder="Business Name"
                            className="w-full rounded-lg border border-gray-200 px-4 py-3 
              text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />

                        <input
                            onChange={(e) => setSupportEmail(e.target.value)}
                            value={suppoerEmail}
                            type="email"
                            placeholder="Support Email"
                            className="w-full rounded-lg border border-gray-200 px-4 py-3 
              text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                {/* Knowledge Base */}
                <div className="mb-8">
                    <h2 className="mb-2 text-sm font-semibold text-gray-800">
                        Knowledge Base
                    </h2>
                    <p className="mb-3 text-sm text-gray-500">
                        Add FAQs, policies, delivery info, refunds, etc.
                    </p>

                    <textarea
                        onChange={(e) => setKnowledge(e.target.value)}
                        value={knowledge}
                        rows={8}
                        placeholder="Write your chatbot knowledge here..."
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 
            text-sm outline-none resize-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                </div>

                {success && (
                    <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                        ✅ Saved successfully
                    </div>
                )}


                {/* Save Button */}
                <button
                    className="rounded-lg bg-black px-6 py-2.5 text-sm font-medium 
          text-white hover:bg-gray-900 transition"
                    onClick={handelSubmit}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default ChatbotSettings
