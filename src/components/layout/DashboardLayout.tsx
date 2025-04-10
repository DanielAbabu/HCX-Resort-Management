
import React from 'react';
import { Toaster } from 'sonner';
import { Bell, Search, User, Moon, Sun } from 'lucide-react';
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
import { useTheme } from 'next-themes';

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
              <span className="block h-6 w-6 text-primary-foreground font-bold text-center">SS</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary via-blue-500 to-blue-400 bg-clip-text text-transparent">SmartServe</span>
          </div>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <SidebarNav />
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <Avatar className="border border-primary/20">
              <AvatarImage src="/placeholder.svg" alt="Admin User" />
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10">AU</AvatarFallback>
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
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-6">
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
                  className="w-full rounded-lg bg-background pl-8 border-border/50 focus-visible:ring-primary/30 md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
          </div>
          <div className="flex flex-1 items-center justify-end gap-4">
            <Button variant="outline" size="icon" className="relative rounded-full border-border/50">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-border/50"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full border-border/50">
                  <Avatar className="h-8 w-8 border border-primary/10">
                    <AvatarImage src="/placeholder.svg" alt="Admin User" />
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10">AU</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card/90 backdrop-blur-sm border border-border">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
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
