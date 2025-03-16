
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-4">
      <div className="text-center max-w-md space-y-6 animate-fade-up">
        <div className="relative mx-auto w-32 h-32 mb-4">
          <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-xl animate-pulse"></div>
          <div className="relative z-10 w-full h-full flex items-center justify-center text-7xl font-bold text-primary">
            404
          </div>
        </div>
        <h1 className="text-3xl font-bold">Page Not Found</h1>
        <p className="text-muted-foreground">
          We couldn't find the page you were looking for. It might have been moved, deleted, or never existed.
        </p>
        <Button asChild className="mt-6" size="lg">
          <Link to="/">
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
