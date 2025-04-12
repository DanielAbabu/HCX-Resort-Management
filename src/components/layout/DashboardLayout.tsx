
import React from "react";
import { Toaster } from "sonner";
import SidebarNav from "./SidebarNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  // Use proper typing for useTheme hook
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex min-h-screen bg-white font-poppins">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-white text-black">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-black p-1.5">
              <span className="block h-6 w-6 text-white font-bold text-center">
                HR
              </span>
            </div>
            <span className="font-bold text-xl text-black">
              HCX Resort
            </span>
          </div>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <SidebarNav />
        </div>
        <div className="p-4 border-t border-black/10">
          <div className="flex items-center gap-3">
            <Avatar className="border border-black/20">
              <AvatarImage src="/placeholder.svg" alt="Admin User" />
              <AvatarFallback className="bg-gray-100 text-black">
                AU
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-black">Admin User</span>
              <span className="text-xs text-black/70">
                admin@hcxresort.com
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 bg-white">
        {/* Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default DashboardLayout;
