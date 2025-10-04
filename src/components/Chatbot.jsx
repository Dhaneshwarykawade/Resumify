// src/components/Chatbot.jsx
import React, { useState } from "react";
import { Send, X } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");

    try {
      // Call backend API
      const response = await fetch("http://localhost:5000/api/analyzeResume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resumeText: userMessage }),
      });

      const data = await response.json();

      // Construct bot reply
      let botReply = "Sorry, no response from AI.";

      // If backend returns suggestions, join them into a message
      if (data.suggestions) {
        botReply = data.suggestions.join("\n");
      } else if (data.reply) {
        botReply = data.reply;
      }

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error("Chatbot API error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops! Something went wrong with AI." },
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="w-80 h-96 bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#1f2937] text-white flex justify-between items-center p-3">
            <h3 className="font-semibold">Resume Bot 🤖</h3>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg text-sm max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-[#f59e0b] text-white self-end"
                    : "bg-gray-100 text-gray-800 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex p-2 border-t border-gray-200">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about resumes..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f59e0b]"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-[#f59e0b] text-white rounded-lg p-2 hover:bg-[#d97706] transition"
            >
              <Send className="w-4 h-4 rotate-45" />
            </button>
          </div>
        </div>
      )}

      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#f59e0b] w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-[#d97706] transition text-2xl"
        >
          🤖
        </button>
      )}
    </div>
  );
};

export default Chatbot;
