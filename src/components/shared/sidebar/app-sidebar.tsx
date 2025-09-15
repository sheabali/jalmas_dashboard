"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  CreditCard,
  FileQuestion,
  Home,
  LayoutDashboard,
  MessageSquare,
  ShieldCheck,
  Star,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const data = {
  user: {
    navMain: [
      {
        title: "Dashboard",
        url: "/user",
        icon: LayoutDashboard,
      },
      {
        title: "Your Profile",
        url: "/user/dashboard/profile",
        icon: User,
      },
      {
        title: "Go Back To Home",
        url: "/",
        icon: Home,
      },
    ],
  },

  admin: {
    navMain: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Users",
        url: "/admin/dashboard/users",
        icon: Users,
      },
      {
        title: "Subscription",
        url: "/admin/dashboard/subscription",
        icon: CreditCard,
      },
      {
        title: "Question",
        url: "/admin/dashboard/question",
        icon: FileQuestion,
      },
      {
        title: "Privacy Policy",
        url: "/admin/dashboard/privacy-policy",
        icon: ShieldCheck,
      },
      {
        title: "Messages",
        url: "/admin/dashboard/messages",
        icon: MessageSquare,
      },
      {
        title: "Feedback",
        url: "/admin/dashboard/feedback",
        icon: Star,
      },
      {
        title: "Profile",
        url: "/admin/dashboard/profile",
        icon: User,
      },
    ],
  },
};

// add roles based on your requirements
interface AppSidebarProps {
  role: string;
}

export default function AppSidebar({ role, ...props }: AppSidebarProps) {
  const sidebarData = data[role?.toLowerCase() as keyof typeof data];

  return (
    <Sidebar
      collapsible="icon"
      className="w-64 border-r border-blue-200"
      {...props}
    >
      <SidebarHeader className="bg-[#F5F5F5] ">
        <Link
          href={"/"}
          className="flex items-center w-full max-h-40 justify-center"
        >
          <Image
            src="/dashboardLogo.svg"
            alt="Logo"
            width={100}
            height={100}
            className="size-auto w-44"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData?.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
