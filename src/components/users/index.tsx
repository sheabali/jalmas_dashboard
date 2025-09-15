"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";

type UserStatus = "Active" | "Restricted";

interface User {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
}

const initialUsers: User[] = [
  { id: "1", name: "Jonathan john", email: "abcd@gmail.com", status: "Active" },
  {
    id: "2",
    name: "Jonathan john",
    email: "abcd@gmail.com",
    status: "Restricted",
  },
  {
    id: "3",
    name: "Jonathan john",
    email: "abcd@gmail.com",
    status: "Restricted",
  },
  { id: "4", name: "Jonathan john", email: "abcd@gmail.com", status: "Active" },
  { id: "5", name: "Jonathan john", email: "abcd@gmail.com", status: "Active" },
  { id: "6", name: "Jonathan john", email: "abcd@gmail.com", status: "Active" },
  {
    id: "7",
    name: "Jonathan john",
    email: "abcd@gmail.com",
    status: "Restricted",
  },
  {
    id: "8",
    name: "Jonathan john",
    email: "abcd@gmail.com",
    status: "Restricted",
  },
];

export default function UserListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleStatusChange = (userId: string, newStatus: UserStatus) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery, users]);

  return (
    <div className="container mx-auto  bg-white mt-2 p-6 ">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">User List</h1>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      <div className="space-y-1">
        {/* Table header */}
        <div className="grid grid-cols-3 gap-4 pb-3 text-sm font-medium text-gray-600 border-b border-gray-200">
          <div>Name</div>
          <div>Email</div>
          <div>Status</div>
        </div>

        {/* User rows */}
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-3 gap-4 py-4 items-center border-b border-gray-100 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://i.ibb.co.com/Rkp8d1qq/Rectangle-23854-1.png"
                  alt={user.name}
                />
                <AvatarFallback className="text-xs bg-gray-200 text-gray-600">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-gray-900">{user.name}</span>
            </div>
            <div className="text-gray-600">{user.email}</div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 focus:outline-none">
                    <Badge
                      variant={
                        user.status === "Active" ? "default" : "destructive"
                      }
                      className={
                        user.status === "Active"
                          ? "bg-green-100 text-green-400 hover:bg-green-100 cursor-pointer"
                          : "bg-red-100 text-red-400 hover:bg-red-100 cursor-pointer"
                      }
                    >
                      {user.status}
                    </Badge>
                    <ChevronDown className="h-3 w-3 text-gray-400" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-32">
                  <DropdownMenuItem
                    onClick={() => handleStatusChange(user.id, "Active")}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Active
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleStatusChange(user.id, "Restricted")}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      Restricted
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
