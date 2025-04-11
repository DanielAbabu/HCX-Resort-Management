import React from "react";
import { Toaster } from "sonner";
import { Bell, Search, User, Moon, Sun } from "lucide-react";
import SidebarNav from "./SidebarNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  // Use proper typing for useTheme hook
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex min-h-screen bg-background font-inter">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-card/50 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-primary/90 p-1.5">
              <span className="block h-6 w-6 text-primary-foreground font-bold text-center">
                HR
              </span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary via-blue-500 to-blue-400 bg-clip-text text-transparent">
              HCX Resort
            </span>
          </div>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <SidebarNav />
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <Avatar className="border border-primary/20">
              <AvatarImage src="/placeholder.svg" alt="Admin User" />
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10">
                AU
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Admin User</span>
              <span className="text-xs text-muted-foreground">
                admin@smartserve.com
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default DashboardLayout;
