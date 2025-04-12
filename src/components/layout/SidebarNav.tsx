
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  MessageSquare, 
  ClipboardList, 
  Lightbulb
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
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all",
        isActive 
          ? "bg-black/5 text-black font-semibold" 
          : "text-black/70 hover:text-black hover:bg-black/5"
      )}
    >
      <Icon className="h-6 w-6" />
      <span>{title}</span>
    </Link>
  );
};

const SidebarNav: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const routes = [
    { title: 'Dashboard', href: '/', icon: Home },
    { title: 'Guest Feedback', href: '/feedback', icon: MessageSquare },
    { title: 'Service Requests', href: '/requests', icon: ClipboardList },
    { title: 'AI Insights', href: '/insights', icon: Lightbulb },
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
