// src/components/Header.tsx
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
      <span className="text-sm text-gray-700">
        Logged in as <strong>{session?.user?.email}</strong>
      </span>

      <button
        className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>
    </header>
  );
}
