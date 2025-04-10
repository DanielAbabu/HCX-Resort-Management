
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  Home, 
  ClipboardList, 
  MessageSquare, 
  Lightbulb, 
  Settings, 
  Users, 
  Calendar
} from 'lucide-react';

interface SidebarItemProps {
  href: string;
  icon: React.ElementType;
  title: string;
  isActive: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  href, 
  icon: Icon, 
  title, 
  isActive 
}) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:text-primary",
        isActive 
          ? "bg-primary/10 text-primary" 
          : "text-muted-foreground hover:bg-accent/50"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{title}</span>
    </Link>
  );
};

const SidebarNav: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const routes = [
    { title: 'Dashboard', href: '/', icon: Home },
    { title: 'Live Feedback', href: '/feedback', icon: MessageSquare },
    { title: 'Service Requests', href: '/requests', icon: ClipboardList },
    { title: 'Analytics', href: '/analytics', icon: BarChart3 },
    { title: 'AI Insights', href: '/insights', icon: Lightbulb },
    { title: 'Staff', href: '/staff', icon: Users },
    { title: 'Schedule', href: '/schedule', icon: Calendar },
    { title: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="flex flex-col gap-1 py-2">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          href={route.href}
          icon={route.icon}
          title={route.title}
          isActive={
            route.href === '/' 
              ? pathname === '/' 
              : pathname.startsWith(route.href)
          }
        />
      ))}
    </div>
  );
};

export default SidebarNav;
