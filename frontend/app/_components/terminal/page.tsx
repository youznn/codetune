"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal } from "lucide-react";

interface Message {
  type: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export default function TerminalPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "system",
      content:
        "🎵 Welcome to CodeTune Terminal! Ask me for music recommendations.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPath] = useState("~/codetune");
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      <div className="max-w-4xl mx-auto">
        {/* Terminal Header */}
        <div className="bg-gray-900 rounded-t-lg p-3 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-gray-400 ml-2">CodeTune Terminal</span>
          </div>
          <Terminal className="w-5 h-5 text-gray-400" />
        </div>

        {/* Terminal Body */}
        <div className="bg-black rounded-b-lg p-4 h-[70vh] overflow-y-auto">
          <div className="space-y-2">
            {messages.map((message, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="text-blue-400 text-sm">
                  [{formatTime(message.timestamp)}]
                </span>
                {message.type === "user" && (
                  <>
                    <span className="text-yellow-400">user@codetune</span>
                    <span className="text-blue-400">:</span>
                    <span className="text-green-400">{currentPath}</span>
                    <span className="text-blue-400">$</span>
                    <span className="text-white ml-2">{message.content}</span>
                  </>
                )}
                {message.type === "assistant" && (
                  <>
                    <span className="text-purple-400">🤖 AI</span>
                    <span className="text-white ml-2">{message.content}</span>
                  </>
                )}
                {message.type === "system" && (
                  <>
                    <span className="text-cyan-400">💻 System</span>
                    <span className="text-white ml-2">{message.content}</span>
                  </>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2">
                <span className="text-blue-400 text-sm">
                  [{formatTime(new Date())}]
                </span>
                <span className="text-purple-400">🤖 AI</span>
                <span className="text-white ml-2">
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
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex items-center space-x-2 bg-gray-900 rounded-lg p-3 border border-gray-700">
            <span className="text-yellow-400">user@codetune</span>
            <span className="text-blue-400">:</span>
            <span className="text-green-400">{currentPath}</span>
            <span className="text-blue-400">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for music recommendations..."
              className="flex-1 bg-transparent text-white outline-none ml-2 placeholder-gray-500"
              disabled={isLoading}
            />
            {isLoading && (
              <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
            )}
          </div>
        </form>

        {/* Help Text */}
        <div className="mt-4 text-gray-500 text-sm">
          <p>
            💡 Try asking: &ldquo;Recommend me some rock music&rdquo; or
            &ldquo;I need upbeat songs for working out&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
