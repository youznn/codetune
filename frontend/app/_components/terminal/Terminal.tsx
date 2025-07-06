"use client";

import React, { useState, useRef, useEffect } from "react";

interface Message {
  type: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export default function Terminal() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPath] = useState("~/codetune");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 클라이언트 마운트 후 Welcome 메시지 추가
  useEffect(() => {
    setMessages([
      {
        type: "system",
        content:
          "🎵 Welcome to CodeTune Terminal! Ask me for music recommendations.",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const responses = [
        "🎵 Based on your request, I'd recommend 'Bohemian Rhapsody' by Queen - a masterpiece of rock opera!",
        "🎶 You might enjoy 'Hotel California' by Eagles - perfect for that classic rock vibe you're looking for.",
        "🎼 Try 'Imagine' by John Lennon - it's a timeless piece that speaks to the soul.",
        "🎤 How about 'Stairway to Heaven' by Led Zeppelin? It's an epic journey through progressive rock.",
        "🎸 I'd suggest 'Sweet Child O' Mine' by Guns N' Roses - that guitar intro is legendary!",
      ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      const assistantMessage: Message = {
        type: "assistant",
        content: randomResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#23272e] border-t border-[#22242a] text-[#cccccc] font-mono shadow-[0_-2px_8px_0_rgba(0,0,0,0.15)]">
      {/* Terminal Header */}
      <div className="px-3 py-2 border-b border-[#22242a] flex items-center bg-[#23272e] min-h-[44px] flex-shrink-0">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-[#ff5f56] rounded-full border border-[#e0443e] shadow-inner"></div>
            <div className="w-3 h-3 bg-[#ffbd2e] rounded-full border border-[#dea123] shadow-inner"></div>
            <div className="w-3 h-3 bg-[#27c93f] rounded-full border border-[#13a10e] shadow-inner"></div>
          </div>
          <span className="text-[#cccccc] ml-2 text-sm font-mono">
            CodeTune Terminal
          </span>
        </div>
      </div>
      {/* Terminal Body */}
      <div className="flex-1 overflow-y-auto bg-[#181a20] p-4">
        <div className="space-y-2">
          {messages.map((message, index) => (
            <div key={index} className="flex items-start space-x-2">
              <span className="text-[#007acc] text-xs font-mono">
                [{formatTime(message.timestamp)}]
              </span>
              {message.type === "user" && (
                <>
                  <span className="text-[#ffbd2e] text-sm font-mono">
                    user@codetune
                  </span>
                  <span className="text-[#007acc]">:</span>
                  <span className="text-[#27c93f] text-sm font-mono">
                    {currentPath}
                  </span>
                  <span className="text-[#007acc]">$</span>
                  <span className="text-[#cccccc] ml-2 text-sm font-mono">
                    {message.content}
                  </span>
                </>
              )}
              {message.type === "assistant" && (
                <>
                  <span className="text-[#b267ff] text-sm font-mono">
                    🤖 AI
                  </span>
                  <span className="text-[#cccccc] ml-2 text-sm font-mono">
                    {message.content}
                  </span>
                </>
              )}
              {message.type === "system" && (
                <>
                  <span className="text-[#2ec4b6] text-sm font-mono">
                    💻 System
                  </span>
                  <span className="text-[#cccccc] ml-2 text-sm font-mono">
                    {message.content}
                  </span>
                </>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2">
              <span className="text-[#007acc] text-xs font-mono">
                [{formatTime(new Date())}]
              </span>
              <span className="text-[#b267ff] text-sm font-mono">🤖 AI</span>
              <span className="text-[#cccccc] ml-2 text-sm font-mono">
                <span className="animate-pulse">Thinking</span>
                <span className="animate-pulse delay-100">.</span>
                <span className="animate-pulse delay-200">.</span>
                <span className="animate-pulse delay-300">.</span>
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        className="h-[56px] flex-shrink-0 flex items-center p-3 bg-[#23272e] border-t border-[#22242a] space-x-2"
      >
        <span className="text-[#ffbd2e] text-sm font-mono">user@codetune</span>
        <span className="text-[#007acc]">:</span>
        <span className="text-[#27c93f] text-sm font-mono">{currentPath}</span>
        <span className="text-[#007acc]">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for music recommendations..."
          className="flex-1 bg-[#181a20] text-[#cccccc] outline-none ml-2 placeholder-[#969696] text-sm font-mono border border-[#22242a] rounded px-2 py-1 focus:border-[#007acc] transition-colors"
          disabled={isLoading}
        />
        {isLoading && (
          <div className="w-4 h-4 border-2 border-[#27c93f] border-t-transparent rounded-full animate-spin"></div>
        )}
      </form>
    </div>
  );
}
