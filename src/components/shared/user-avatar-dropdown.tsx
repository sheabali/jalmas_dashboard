"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/redux/features/authSlice";
import { useGetUserQuery } from "@/redux/features/dashboardManagementApi";
import { useAppDispatch } from "@/redux/hooks";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserAvatarDropdown() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const { data: user } = useGetUserQuery({});

  console.log("user0", user?.data);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
    // window.location.reload();
  };

  return (
    <>
      {/* Top Bar */}
      <div className="flex items-center gap-6">
        {/* User Info */}
        <div>
          <h1 className="font-semibold">{user?.data?.fullName}</h1>
          <p className="text-xs text-muted-foreground">Super Admin</p>
        </div>

        {/* Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={user?.data?.image || "https://i.pravatar.cc/150?u=1"}
                  alt="User avatar"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Open user menu</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Notifications Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Example Notification Item */}
            <div className="flex items-start gap-3 border-b pb-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://i.pravatar.cc/150?u=1" />
                <AvatarFallback>DR</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">
                  Darlene Robertson{" "}
                  <span className="text-muted-foreground font-normal">
                    Subscribe Yearly Plan
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">Just Now</p>
              </div>
            </div>

            {/* Repeat Notifications */}
            {[2, 3, 4].map((id) => (
              <div
                key={id}
                className="flex items-start gap-3 border-b pb-3 last:border-0"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://i.pravatar.cc/150?u=2" />
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    Darlene Robertson{" "}
                    <span className="text-muted-foreground font-normal">
                      Subscribe Monthly Plan
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Tomorrow at 12 Noon
                  </p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
