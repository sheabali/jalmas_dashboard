/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { useEffect, useRef, useState } from "react";

type Message = {
  id: string;
  senderId: string;
  text?: string;
  imageUrl?: string;
  formLink?: boolean;
  timestamp: string;
  isSelf: boolean;
  isRead?: boolean;
};

type Thread = {
  id: string;
  name: string;
  username: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  avatar: string;
  messages: Message[];
};

const initialThreads: Thread[] = [
  {
    id: "1",
    name: "Andre Sophia",
    username: "@sophia_fashion",
    lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    time: "10 min",
    unreadCount: 8,
    avatar:
      "https://i.ibb.co/NdX6yftP/5494b940bf7438a0dc0315081e3bd6586cc8cbfb.jpg",
    messages: [
      {
        id: "msg1",
        senderId: "other",
        text: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore.",
        timestamp: "10:00 AM",
        isSelf: false,
      },
      {
        id: "msg2",
        senderId: "other",
        text: "Sed Do Eiusmod Tempor Incididunt Ut Labore Et Magna Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip.",
        timestamp: "10:05 AM",
        isSelf: false,
      },
      {
        id: "msg3",
        senderId: "self",
        text: "Lorem Ipsum Dolor Sit",
        timestamp: "10:10 AM",
        isSelf: true,
        isRead: true,
      },
      {
        id: "msg4",
        senderId: "other",
        text: "Sed Do Eiusmod Tempor Incididunt Ut Labore Et Magna Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip.",
        timestamp: "10:15 AM",
        isSelf: false,
      },
      {
        id: "msg5",
        senderId: "self",
        text: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing",
        timestamp: "10:20 AM",
        isSelf: true,
        isRead: true,
      },
      {
        id: "msg6",
        senderId: "self",
        imageUrl:
          "https://i.ibb.co/tprWjmtN/5bcf0032b459e28bfa6d164a846c119d68094d8f.png",
        timestamp: "10:25 AM",
        isSelf: true,
        isRead: true,
      },
      {
        id: "msg7",
        senderId: "other",
        text: "Sed Do Eiusmod Tempor Incididunt ",
        formLink: true,
        timestamp: "10:30 AM",
        isSelf: false,
      },
    ],
  },
  {
    id: "2",
    name: "Michael Tony",
    username: "@michael_t",
    lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    time: "10 min",
    unreadCount: 3,
    avatar: "https://i.ibb.co/mVjzdhHW/Rectangle-23852.png",
    messages: [
      {
        id: "msg8",
        senderId: "other",
        text: "Hello Michael!",
        timestamp: "09:00 AM",
        isSelf: false,
      },
      {
        id: "msg9",
        senderId: "self",
        text: "Hi there!",
        timestamp: "09:05 AM",
        isSelf: true,
        isRead: true,
      },
    ],
  },
  {
    id: "3",
    name: "Joseph Ray",
    username: "@joseph_r",
    lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    time: "10 min",
    unreadCount: 1,
    avatar: "https://i.ibb.co/8hL2q29/Rectangle-2.png",
    messages: [
      {
        id: "msg10",
        senderId: "other",
        text: "How are you?",
        timestamp: "08:00 AM",
        isSelf: false,
      },
    ],
  },
  {
    id: "4",
    name: "Thomas Adison",
    username: "@thomas_a",
    lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    time: "10 min",
    unreadCount: 2,
    avatar:
      "https://i.ibb.co/DHBqzbDt/ef1af8ed251faadbbf52b855767aff74d9e02bac.png",
    messages: [
      {
        id: "msg11",
        senderId: "other",
        text: "Good morning!",
        timestamp: "07:00 AM",
        isSelf: false,
      },
    ],
  },
  {
    id: "5",
    name: "Jira",
    username: "@jira_support",
    lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    time: "10 min",
    unreadCount: 2,
    avatar: "https://i.ibb.co/zhn1crwC/Rectangle-23853.png",
    messages: [
      {
        id: "msg12",
        senderId: "other",
        text: "Ticket #1234 has been updated.",
        timestamp: "06:00 AM",
        isSelf: false,
      },
    ],
  },
  {
    id: "6",
    name: "Michael Tony",
    username: "@michael_t",
    lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    time: "10 min",
    unreadCount: 2,
    avatar:
      "https://i.ibb.co/DHBqzbDt/ef1af8ed251faadbbf52b855767aff74d9e02bac.png",
    messages: [
      {
        id: "msg13",
        senderId: "other",
        text: "Checking in!",
        timestamp: "05:00 AM",
        isSelf: false,
      },
    ],
  },
  {
    id: "7",
    name: "Joseph Ray",
    username: "@joseph_r",
    lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    time: "10 min",
    unreadCount: 2,
    avatar:
      "https://i.ibb.co/NdX6yftP/5494b940bf7438a0dc0315081e3bd6586cc8cbfb.jpg",
    messages: [
      {
        id: "msg14",
        senderId: "other",
        text: "See you soon.",
        timestamp: "04:00 AM",
        isSelf: false,
      },
    ],
  },
];

export default function MessagesPage() {
  const [activeChatId, setActiveChatId] = useState<string | null>("1");
  const [threads, setThreads] = useState<Thread[]>(initialThreads);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeChat = threads.find((thread) => thread.id === activeChatId);

  useEffect(() => {
    if (activeChat && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeChat?.messages]);

  const handleImageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeChat) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newMsg: Message = {
          id: String(activeChat.messages.length + 1),
          senderId: "self",
          imageUrl: reader.result as string,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isSelf: true,
          isRead: true,
        };

        setThreads((prevThreads) =>
          prevThreads.map((thread) =>
            thread.id === activeChatId
              ? {
                  ...thread,
                  messages: [...thread.messages, newMsg],
                  lastMessage: "Image sent",
                  time: "Just now",
                  unreadCount: 0,
                }
              : thread
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;

    const newMsg: Message = {
      id: String(activeChat.messages.length + 1),
      senderId: "self",
      text: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSelf: true,
      isRead: true,
    };

    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === activeChatId
          ? {
              ...thread,
              messages: [...thread.messages, newMsg],
              lastMessage: newMsg.text || "",
              time: "Just now",
              unreadCount: 0,
            }
          : thread
      )
    );
    setNewMessage("");
  };

  return (
    <div className="  mt-2 h-screen flex w-full flex-col bg-gray-100 dark:bg-gray-950 md:flex-row">
      {/* Sidebar */}
      <div
        className={`${
          activeChatId ? "hidden" : "flex"
        } w-full flex-col border-b bg-white p-4 dark:border-gray-800 dark:bg-gray-900 md:flex md:w-80 md:border-r md:border-b-0`}
      >
        <h2 className="mb-6 text-2xl font-bold">Messages</h2>
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {threads.map((thread) => (
              <div
                key={thread.id}
                className={`flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors ${
                  activeChatId === thread.id
                    ? "bg-gray-100 dark:bg-gray-800"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
                onClick={() => setActiveChatId(thread.id)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    className="object-cover"
                    src={thread.avatar || "/placeholder.svg"}
                  />
                  <AvatarFallback>{thread.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{thread.name}</h3>
                    <span className="text-xs text-write dark:text-gray-400">
                      {thread.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-write dark:text-gray-400 line-clamp-1">
                      {thread.lastMessage}
                    </p>
                    {thread.unreadCount > 0 && (
                      <span className="flex h-5 w-10 items-center justify-center rounded-full bg-primary text-xs text-white">
                        {thread.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Panel */}
      <div
        className={`flex flex-1 flex-col bg-white dark:bg-gray-900 ${
          activeChatId ? "flex" : "hidden"
        } md:flex`}
      >
        {/* Chat header */}
        {activeChat ? (
          <>
            <div className="flex items-center gap-4 border-b p-4 dark:border-gray-800">
              <Button
                size="sm"
                className="md:hidden"
                onClick={() => setActiveChatId(null)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Avatar className="h-10 w-10">
                <AvatarImage className="object-cover" src={activeChat.avatar} />
                <AvatarFallback>{activeChat.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{activeChat.name}</h3>
                <p className="text-sm text-write dark:text-gray-400">
                  {activeChat.username}
                </p>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 px-2 py-4 sm:px-4">
              <div className="space-y-4">
                {activeChat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${
                      message.isSelf ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!message.isSelf && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={activeChat.avatar}
                          className="h-8 w-8 object-cover"
                        />
                        <AvatarFallback>
                          {activeChat.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.isSelf
                          ? "bg-primary text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-50"
                      }`}
                    >
                      {message.text && (
                        <p className="text-sm">
                          {message.text}
                          {message.formLink && (
                            <Link
                              href="#"
                              className="font-bold text-blue-300 hover:underline"
                            >
                              {" FILL FORM"}
                            </Link>
                          )}
                        </p>
                      )}
                      {message.imageUrl && (
                        <Image
                          src={message.imageUrl}
                          alt="Chat image"
                          width={150}
                          height={100}
                          className="rounded-md object-cover"
                        />
                      )}
                      <div className="flex justify-between mt-1 text-xs">
                        <span
                          className={`${
                            message.isSelf
                              ? "text-gray-200"
                              : "text-write dark:text-gray-400"
                          }`}
                        >
                          {message.timestamp}
                        </span>
                        {message.isSelf && message.isRead && (
                          <span className="text-gray-200">✓✓</span>
                        )}
                      </div>
                    </div>
                    {message.isSelf && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          className="object-cover"
                          src="https://i.ibb.co/mVjzdhHW/Rectangle-23852.png"
                        />
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message input */}
            <form
              onSubmit={handleSendMessage}
              className="flex items-start gap-2 border-t p-4 dark:border-gray-800"
            >
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageSelected}
                className="hidden"
              />
              {/* <Button size="sm" onClick={handleImageUploadClick} type="button">
                <ImageIcon className="h-5 w-5 text-white dark:text-gray-400" />
              </Button> */}
              {/* <Button
                size="sm"
                type="button"
                onClick={() => alert("File upload not implemented yet!")}
                className="hidden lg:block"
              >
                <PaperclipIcon className="h-5 w-5 text-write dark:text-gray-400" />
              </Button> */}
              {/* <Button
                size="sm"
                type="button"
                onClick={() => alert("Emoji picker not implemented yet!")}
              >
                <Smile className="h-5 w-5 text-write dark:text-gray-400" />
              </Button> */}
              <div className="flex flex-1 items-center gap-2">
                <Textarea
                  placeholder="Type message here..."
                  className="flex-1 resize-none bg-gray-100 px-4 py-2  dark:bg-gray-800"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button size="lg" type="submit" className="h-14 bg-[#1C934E]">
                  <ChevronRight className="h-14 w-14 text-white " />
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-write">
            Select a chat to start messaging.
          </div>
        )}
      </div>
    </div>
  );
}
