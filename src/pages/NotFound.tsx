
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center py-20">
        <div className="rounded-full bg-muted p-6 mb-6">
          <FileQuestion className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Button size="lg" asChild>
          <a href="/">Return to Dashboard</a>
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default NotFound;
