
import React from 'react';
import { Toaster } from 'sonner';
import { Bell, Search, User } from 'lucide-react';
import SidebarNav from './SidebarNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-card">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-primary p-1">
              <span className="block h-6 w-6 text-primary-foreground font-bold text-center">SS</span>
            </div>
            <span className="font-bold text-xl">SmartServe</span>
          </div>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <SidebarNav />
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Admin User" />
              <AvatarFallback>AU</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Admin User</span>
              <span className="text-xs text-muted-foreground">admin@smartserve.com</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="md:hidden flex items-center gap-2">
            <div className="rounded-md bg-primary p-1">
              <span className="block h-6 w-6 text-primary-foreground font-bold text-center">SS</span>
            </div>
            <span className="font-bold text-xl">SmartServe</span>
          </div>
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
          </div>
          <div className="flex flex-1 items-center justify-end gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="Admin User" />
                    <AvatarFallback>AU</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Help</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default DashboardLayout;
