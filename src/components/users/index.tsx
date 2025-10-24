/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  useActiveOrDeactiveUserMutation,
  useGetAllUsersQuery,
} from "@/redux/features/dashboardManagementApi";
import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type UserStatus = "Active" | "Restricted";

interface User {
  id: string;
  fullName: string;
  email: string;
  image?: string;
  isBlocked: boolean;
}

export default function UserListPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const [makeActiveOrRestricted, { isLoading: isUpdating }] =
    useActiveOrDeactiveUserMutation();
  const { data, isLoading, isFetching } = useGetAllUsersQuery({
    page,
    limit,
    search,
  });

  const userData: User[] = data?.data?.data || [];
  const meta = data?.data?.meta;

  const handleStatusChange = async (userId: string, newStatus: UserStatus) => {
    try {
      const res = await makeActiveOrRestricted({ id: userId }).unwrap();

      if (res.success) {
        toast.success(`User ${newStatus} successfully`);
      } else {
        toast.error("Failed to update user status");
      }
    } catch (error: any) {
      console.error("Error updating user status:", error);
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (meta && page < Math.ceil(meta.total / meta.limit)) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="container mx-auto bg-white mt-2 p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">User List</h1>

        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
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

        {isLoading || isFetching ? (
          <div className="py-10 text-center text-gray-500">Loading...</div>
        ) : userData.length === 0 ? (
          <div className="py-10 text-center text-gray-500">No users found.</div>
        ) : (
          userData.map((user) => {
            const status: UserStatus = user.isBlocked ? "Restricted" : "Active";
            return (
              <div
                key={user.id}
                className="grid grid-cols-3 gap-4 py-4 items-center border-b border-gray-100 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.image || "/boy.png"}
                      alt={user.fullName}
                    />
                    <AvatarFallback className="text-xs bg-gray-200 text-gray-600">
                      {user.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-gray-900">{user.fullName}</span>
                </div>

                <div className="text-gray-600">{user.email}</div>

                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-1 focus:outline-none">
                        <Badge
                          variant={
                            status === "Active" ? "default" : "destructive"
                          }
                          className={
                            status === "Active"
                              ? "bg-green-100 text-green-500 hover:bg-green-100 cursor-pointer"
                              : "bg-red-100 text-red-500 hover:bg-red-100 cursor-pointer"
                          }
                        >
                          {status}
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
                          {isUpdating ? "Updating..." : "Active"}
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(user.id, "Restricted")
                        }
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          {isUpdating ? "Updating..." : "Restricted"}
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {meta && (
        <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
          <div>
            Page {meta.page} of {Math.ceil(meta.total / meta.limit)}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Prev
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={page >= Math.ceil(meta.total / meta.limit)}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
