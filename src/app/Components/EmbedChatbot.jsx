"use client";

import { useState } from "react";

export default function EmbedChatbot({ ownerId }) {
  const [copied, setCopied] = useState(false);

  const embedCode = `<script 
  src="${process.env.NEXT_PUBLIC_APP_URL}/chatbot.js"
  data-org-id="${ownerId}">
</script>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-900">
        Embed Chatbot
      </h1>
      <p className="text-gray-500 mt-1">
        Copy and paste this code before the closing <code>&lt;/body&gt;</code> tag
      </p>

      {/* Code Box */}
      <div className="relative mt-6">
        <pre className="bg-black text-green-400 rounded-xl p-5 text-sm overflow-x-auto">
          {embedCode}
        </pre>

        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 bg-white text-black px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Steps */}
      <ol className="mt-6 text-gray-600 text-sm space-y-1 list-decimal list-inside">
        <li>Copy the embed script</li>
        <li>Paste it before the closing <code>&lt;/body&gt;</code> tag</li>
        <li>Reload your website</li>
      </ol>

      {/* Live Preview */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-900">
          Live Preview
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          This is how the chatbot will appear on your website
        </p>

        {/* Fake Browser */}
        <div className="mt-4 border rounded-xl overflow-hidden shadow-sm">
          <div className="bg-gray-100 px-4 py-2 flex gap-2">
            <span className="w-3 h-3 bg-red-400 rounded-full" />
            <span className="w-3 h-3 bg-yellow-400 rounded-full" />
            <span className="w-3 h-3 bg-green-400 rounded-full" />
          </div>

          <div className="relative h-64 bg-white">
            <p className="text-gray-400 text-center mt-10">
              Your website goes here
            </p>

            {/* Chat Preview */}
            <div className="absolute bottom-4 right-4 w-64 bg-white border rounded-xl shadow-lg">
              <div className="bg-black text-white px-3 py-2 text-sm rounded-t-xl flex justify-between">
                <span>Customer Support</span>
                <span>✕</span>
              </div>

              <div className="p-3 space-y-2 text-sm">
                <div className="bg-gray-200 p-2 rounded-lg w-fit">
                  hi! how can I help you?
                </div>
                <div className="bg-black text-white p-2 rounded-lg w-fit ml-auto">
                  what is the return policy?
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
