(function () {

    // ===============================
    // LOAD AXIOS SAFELY
    // ===============================
    function loadAxios(callback) {
      if (window.axios) return callback();
  
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
      script.onload = callback;
      document.head.appendChild(script);
    }
  
    loadAxios(init);
  
    function init() {
  
      // ===============================
      // CONFIG (SAFE SCRIPT DETECTION)
      // ===============================
      const SCRIPT_TAG = document.querySelector("script[data-org-id]");
      const OWNER_ID = SCRIPT_TAG ? SCRIPT_TAG.getAttribute("data-org-id") : null;
      const API_URL = "https://support-ai-gamma.vercel.app/api/chat";
  
      if (!OWNER_ID) {
        console.error("SupportAI: data-org-id is missing");
        return;
      }
  
      // ===============================
      // STYLES
      // ===============================
      const style = document.createElement("style");
      style.innerHTML = `
        .supportai-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 56px;
          height: 56px;
          background: black;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(0,0,0,0.25);
          animation: float 3s ease-in-out infinite;
          z-index: 999999;
        }
  
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }
  
        .supportai-chat {
          position: fixed;
          bottom: 90px;
          right: 24px;
          width: 340px;
          max-height: 520px;
          background: white;
          border-radius: 14px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          display: none;
          flex-direction: column;
          overflow: hidden;
          z-index: 999999;
          font-family: system-ui, -apple-system, BlinkMacSystemFont;
        }
  
        .supportai-header {
          background: black;
          color: white;
          padding: 14px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          font-weight: 500;
        }
  
        .supportai-messages {
          padding: 12px;
          flex: 1;
          overflow-y: auto;
          background: #f9fafb;
        }
  
        .supportai-msg {
          max-width: 80%;
          margin-bottom: 10px;
          padding: 10px 12px;
          border-radius: 12px;
          font-size: 13px;
          line-height: 1.4;
        }
  
        .supportai-user {
          background: black;
          color: white;
          margin-left: auto;
          border-bottom-right-radius: 4px;
        }
  
        .supportai-bot {
          background: #e5e7eb;
          color: #111;
          border-bottom-left-radius: 4px;
        }
  
        .supportai-input {
          display: flex;
          padding: 10px;
          border-top: 1px solid #e5e7eb;
          gap: 8px;
        }
  
        .supportai-input input {
          flex: 1;
          padding: 8px 10px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          outline: none;
          font-size: 13px;
        }
  
        .supportai-input button {
          background: black;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 14px;
          font-size: 13px;
          cursor: pointer;
        }
      `;
      document.head.appendChild(style);
  
      // ===============================
      // HTML
      // ===============================
      const button = document.createElement("div");
      button.className = "supportai-btn";
      button.textContent = "💬";
  
      const chat = document.createElement("div");
      chat.className = "supportai-chat";
      chat.innerHTML = `
        <div class="supportai-header">
          <span>Customer Support</span>
          <span id="supportai-close" style="cursor:pointer">✕</span>
        </div>
        <div class="supportai-messages"></div>
        <div class="supportai-input">
          <input placeholder="Type a message..." />
          <button>Send</button>
        </div>
      `;
  
      document.body.appendChild(button);
      document.body.appendChild(chat);
  
      // ===============================
      // LOGIC
      // ===============================
      const messagesEl = chat.querySelector(".supportai-messages");
      const inputEl = chat.querySelector("input");
      const sendBtn = chat.querySelector("button");
      const closeBtn = chat.querySelector("#supportai-close");
  
      function addMessage(text, type) {
        const div = document.createElement("div");
        div.className = `supportai-msg ${type}`;
        div.textContent = text;
        messagesEl.appendChild(div);
        messagesEl.scrollTop = messagesEl.scrollHeight;
      }
  
      async function sendMessage() {
        const text = inputEl.value.trim();
        if (!text) return;
  
        addMessage(text, "supportai-user");
        inputEl.value = "";
  
        const typing = document.createElement("div");
        typing.className = "supportai-msg supportai-bot";
        typing.textContent = "Typing...";
        messagesEl.appendChild(typing);
  
        try {
          const res = await axios.post(API_URL, {
            ownerId: OWNER_ID,
            message: text
          });
  
          typing.remove();
  
          // ✅ NO QUOTES ISSUE
          addMessage(res.data.reply || res.data, "supportai-bot");
  
        } catch (err) {
            console.error("SupportAI Full Error:", err);
            console.error("Response:", err?.response);
            console.error("Data:", err?.response?.data);
          
            addMessage(
              err?.response?.data?.message || 
              "Server error. Check console.",
              "supportai-bot"
            );
        }
      }
  
      // ===============================
      // EVENTS
      // ===============================
      button.onclick = () => {
        chat.style.display = "flex";
        button.style.display = "none";
  
        if (!messagesEl.children.length) {
          addMessage(
            "Hello! Welcome to our support. How can I assist you today?",
            "supportai-bot"
          );
        }
      };
  
      closeBtn.onclick = () => {
        chat.style.display = "none";
        button.style.display = "flex";
      };
  
      sendBtn.onclick = sendMessage;
      inputEl.addEventListener("keydown", e => {
        if (e.key === "Enter") sendMessage();
      });
    }
  })();
  