/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type SocketEvent =
  | "authenticate"
  | "message"
  | "fetchChats"
  | "unReadMessages"
  | "messageList"
  | "onlineUsers"
  | "myAdminChats";

interface SocketMessage {
  event: SocketEvent;
  [key: string]: any;
}

interface Message {
  id: string;
  message: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
}

const useSocketIO = (url: string, authToken: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messageList, setMessageList] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!authToken) {
      console.error("❌ No auth token provided");
      setLoading(false);
      return;
    }

    // Convert ws:// to http:// for Socket.IO
    const socketUrl = url
      .replace(/^ws:\/\//, "http://")
      .replace(/^wss:\/\//, "https://");
    console.log("🔄 Initializing Socket.IO connection to:", socketUrl);

    // Initialize Socket.IO connection
    const socketInstance = io(socketUrl, {
      auth: {
        token: authToken,
      },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
      autoConnect: true,
    });

    socketRef.current = socketInstance;

    // Connection event
    socketInstance.on("connect", () => {
      console.log("✅ Connected to Socket.IO - Socket ID:", socketInstance.id);
      setIsConnected(true);

      // Try authentication via emit (in case auth option didn't work)
      console.log("🔑 Sending authentication token");
      socketInstance.emit("authenticate", { token: authToken });

      // Request message list after a delay
      setTimeout(() => {
        console.log("📤 Requesting messageList");
        socketInstance.emit("messageList");
      }, 1000);
    });

    // Authenticated event
    socketInstance.on("authenticated", (data: any) => {
      console.log("🔐 Authenticated successfully:", data);
      socketInstance.emit("messageList");
    });

    // Message list event
    socketInstance.on("messageList", (data: any) => {
      console.log("📩 Message List received:", data);
      setMessageList(data);
      setLoading(false);
    });

    // Fetch chats event
    socketInstance.on("fetchChats", (data: any) => {
      console.log("📩 Chats fetched:", data);
      setChatMessages(data.data || []);
      setLoading(false);
    });

    // New message event
    socketInstance.on("message", (data: any) => {
      console.log("📩 New message received:", data);

      // Add message to chat
      setChatMessages((prev) => [...prev, data.data || data]);

      // Update message list
      setMessageList((prevList: any) => {
        if (!prevList || !prevList.data) return prevList;

        const messageData = data.data || data;
        const updatedList = prevList.data.map((chat: any) => {
          if (
            chat.user.id === messageData.senderId ||
            chat.user.id === messageData.receiverId
          ) {
            return {
              ...chat,
              lastMessage: {
                message: messageData.message,
                createdAt: messageData.createdAt,
              },
            };
          }
          return chat;
        });
        return { ...prevList, data: updatedList };
      });
    });

    // Socket error event
    socketInstance.on("socketError", (error: any) => {
      console.error("⚠️ Socket error:", error);
      setLoading(false);
    });

    // General error event
    socketInstance.on("error", (error: any) => {
      console.error("⚠️ Error:", error);
      setLoading(false);
    });

    // User status event
    socketInstance.on("userStatus", (data: any) => {
      console.log("👤 User status update:", data);
    });

    // Disconnect event
    socketInstance.on("disconnect", (reason: string) => {
      console.log("❌ Disconnected from Socket.IO:", reason);
      setIsConnected(false);
    });

    // Connection error
    socketInstance.on("connect_error", (error: Error) => {
      console.error("⚠️ Connection error:", error.message);
      setIsConnected(false);
      setLoading(false);
    });

    // Reconnect attempt
    socketInstance.on("reconnect_attempt", (attemptNumber: number) => {
      console.log("🔄 Reconnection attempt:", attemptNumber);
    });

    // Reconnect success
    socketInstance.on("reconnect", (attemptNumber: number) => {
      console.log("✅ Reconnected after", attemptNumber, "attempts");
      setIsConnected(true);
      socketInstance.emit("messageList");
    });

    setSocket(socketInstance);

    // Cleanup on unmount
    return () => {
      console.log("🧹 Cleaning up socket connection");
      socketInstance.disconnect();
      socketRef.current = null;
    };
  }, [url, authToken]);

  // Function to send messages
  const sendMessage = (data: SocketMessage) => {
    if (!socket) {
      console.warn("⚠️ Socket not initialized");
      return;
    }

    if (!isConnected) {
      console.warn("⚠️ Socket not connected");
      return;
    }

    const { event, ...payload } = data;
    socket.emit(event, payload);
    console.log(`📤 Emitting ${event}:`, payload);
  };

  // Function to fetch messages for a specific user
  const fetchMessagesByUserId = (userId: string) => {
    if (!socket) {
      console.warn("⚠️ Socket not initialized");
      return;
    }

    if (!isConnected) {
      console.warn("⚠️ Socket not connected");
      return;
    }

    socket.emit("fetchChats", {
      receiverId: userId,
    });
    setLoading(true);
    console.log("📤 Fetching chats for user:", userId);
  };

  // Function to fetch admin chats
  const fetchAdminChats = () => {
    if (!socket) {
      console.warn("⚠️ Socket not initialized");
      return;
    }

    if (!isConnected) {
      console.warn("⚠️ Socket not connected");
      return;
    }

    socket.emit("myAdminChats");
    console.log("📤 Fetching admin chats");
  };

  return {
    socket,
    isConnected,
    messageList,
    chatMessages,
    loading,
    sendMessage,
    fetchMessagesByUserId,
    fetchAdminChats,
  };
};

export default useSocketIO;
