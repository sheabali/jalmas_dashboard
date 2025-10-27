/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, CircleUser, Menu, Send, X } from "lucide-react";

import MyFormInput1 from "@/components/shared/MyFormInput1";
import MyFormWrapper from "@/components/shared/MyFormWrapper";
import { Button } from "@/components/ui/button";

import useSocketIO from "@/hooks/useWebSocket";
import { seletCurrentToken } from "@/redux/features/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import type { FieldValues } from "react-hook-form";

export default function CommonMessage() {
  const authToken: any = useAppSelector(seletCurrentToken);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    sendMessage,
    messageList,
    chatMessages,
    loading,
    fetchMessagesByUserId,
    isConnected,
  } = useSocketIO("ws://10.0.30.198:3232", authToken);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Handle user selection
  const handleUserSelect = (userId: string, user: any) => {
    setSelectedUserId(userId);
    setSelectedUser(user);
    fetchMessagesByUserId(userId);
    setShowSidebar(false); // Close sidebar on mobile after selection
  };

  // Handle send message
  const handleSubmit = (data: FieldValues) => {
    if (!selectedUserId || !data.message.trim()) return;

    const messageData: any = {
      event: "message",
      receiverId: selectedUserId,
      message: data.message,
    };

    sendMessage(messageData);

    return { message: "" };
  };

  // Get current user ID from auth
  const currentUserId = useAppSelector((state) => state.auth?.user?.id);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
      >
        {showSidebar ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Left Sidebar - Responsive */}
      <div
        className={`
          fixed lg:relative inset-y-0 left-0 z-40
          w-full sm:w-80 lg:w-96
          transform transition-transform duration-300 ease-in-out
          ${
            showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="h-full flex flex-col bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-xl m-2 lg:m-4 rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-green-50 to-blue-50">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Messages
              </h1>
              {/* Connection status indicator */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-sm">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"
                  }`}
                />
                <span className="text-xs font-medium text-gray-700">
                  {isConnected ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          </div>

          {/* Chat List */}
          <div className="overflow-auto flex-1 p-2">
            {loading && !messageList ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              </div>
            ) : (
              <div className="space-y-2">
                {messageList?.data?.map((chat: any) => (
                  <button
                    key={chat?.user?.id}
                    className={`
                      flex items-center gap-3 p-4 rounded-2xl cursor-pointer w-full text-left
                      transition-all duration-200 hover:scale-[1.02]
                      ${
                        selectedUserId === chat?.user?.id
                          ? "bg-gradient-to-r from-green-100 to-blue-100 shadow-md"
                          : "hover:bg-white/60 hover:shadow-sm"
                      }
                    `}
                    onClick={() => handleUserSelect(chat?.user?.id, chat?.user)}
                  >
                    <div className="relative">
                      <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                        {chat?.user?.image ? (
                          <AvatarImage
                            src={chat?.user?.image}
                            alt={chat?.user?.fullName}
                            className="object-cover"
                          />
                        ) : (
                          <CircleUser className="w-12 h-12 text-gray-400" />
                        )}
                      </Avatar>
                      {isConnected && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-gray-900 truncate">
                          {chat?.user?.fullName}
                        </span>
                        {chat?.lastMessage?.createdAt && (
                          <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                            {format(
                              new Date(chat?.lastMessage?.createdAt),
                              "HH:mm"
                            )}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {chat?.lastMessage?.message || "No messages yet"}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {showSidebar && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative z-10">
        {selectedUser ? (
          <div className="flex flex-col h-full bg-white/60 backdrop-blur-xl m-2 lg:m-4 rounded-3xl shadow-xl overflow-hidden">
            {/* Chat Header */}
            <div className="flex items-center gap-4 p-4 lg:p-6 border-b border-gray-100 bg-gradient-to-r from-green-50 to-blue-50">
              <button
                onClick={() => setSelectedUser(null)}
                className="lg:hidden p-2 hover:bg-white/60 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <Avatar className="w-10 h-10 lg:w-12 lg:h-12 border-2 border-white shadow-sm">
                {selectedUser?.image ? (
                  <AvatarImage
                    src={selectedUser?.image}
                    alt={selectedUser?.fullName}
                  />
                ) : (
                  <CircleUser className="w-10 h-10 lg:w-12 lg:h-12 text-gray-400" />
                )}
              </Avatar>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-gray-900 truncate">
                  {selectedUser?.fullName}
                </h2>
                <p className="text-sm text-gray-600">
                  {selectedUser?.status || "Online"}
                </p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-auto p-4 lg:p-6 space-y-4">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                </div>
              ) : chatMessages.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-full text-gray-500">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Send className="w-10 h-10 text-green-600" />
                  </div>
                  <p className="text-lg font-medium">No messages yet</p>
                  <p className="text-sm">Start the conversation!</p>
                </div>
              ) : (
                chatMessages?.map((msg: any) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.senderId === currentUserId
                        ? "justify-end"
                        : "justify-start"
                    } animate-fadeIn`}
                  >
                    <div
                      className={`
                        max-w-[85%] sm:max-w-[70%] rounded-2xl p-4 shadow-sm
                        transform transition-all hover:scale-[1.02]
                        ${
                          msg.senderId === currentUserId
                            ? "bg-gradient-to-br from-green-500 to-blue-500 text-white rounded-br-sm"
                            : "bg-white rounded-bl-sm"
                        }
                      `}
                    >
                      <p className="w-full break-words">{msg.message}</p>
                      <p
                        className={`text-xs mt-2 ${
                          msg.senderId === currentUserId
                            ? "text-green-100"
                            : "text-gray-500"
                        }`}
                      >
                        {format(new Date(msg.createdAt), "HH:mm")}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 lg:p-6 border-t border-gray-100 bg-white/80 backdrop-blur-sm">
              <MyFormWrapper
                onSubmit={handleSubmit}
                className="flex gap-2 lg:gap-3 w-full"
              >
                <MyFormInput1
                  name="message"
                  className="flex-1 rounded-2xl border-2 border-gray-200 focus:border-green-400 bg-white/60 backdrop-blur-sm px-4 py-3"
                  placeholder="Type a message..."
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-br from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-2xl px-4 lg:px-6 py-6 text-white shadow-md hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading || !isConnected}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </MyFormWrapper>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center">
              <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-6 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center">
                <CircleUser className="w-12 h-12 lg:w-16 lg:h-16 text-green-600" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                Welcome to Messages
              </h3>
              <p className="text-gray-600 text-sm lg:text-base">
                Select a conversation to start chatting
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
