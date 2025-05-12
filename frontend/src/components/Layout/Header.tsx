
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/UI/ThemeToggle";
import { useChat } from "@/context/ChatContext";

export default function Header() {
  const { user, logout } = useAuth();
  const { clearChat } = useChat();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    clearChat();
    navigate("/");
  };

  return (
    <header className="border-b bg-card">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            <span className="text-xl font-bold">Darwin</span>
          </Link>
          {user && (
            <nav className="hidden md:flex gap-6">
              <Link
                to="/chat"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Chat
              </Link>
              <Link
                to="/dashboard"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Dashboard
              </Link>
            </nav>
          )}
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <div className="flex flex-col space-y-1 text-right">
                  <p className="text-sm font-medium leading-none">
                    {user.displayName || user.email}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button variant="default" size="sm" asChild>
              <Link to="/auth">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
