// src/components/Sidebar.tsx
import Link from "next/link";
import { LogOut, History, ScanLine } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  return (
    <aside className="w-64 hidden md:flex flex-col bg-white border-r shadow-lg px-6 py-8 space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">CyberSaaS</h1>
      <nav className="flex flex-col gap-4 text-sm font-medium">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
        >
          <ScanLine className="w-4 h-4" /> Dashboard
        </Link>
        <Link
          href="/dashboard/history"
          className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
        >
          <History className="w-4 h-4" /> Scan History
        </Link>
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
        >
          ⚙️ Settings
        </Link>
      </nav>
      <button
        onClick={() => signOut()}
        className="mt-auto flex items-center gap-2 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md text-sm"
      >
        <LogOut className="w-4 h-4" /> Log Out
      </button>
    </aside>
  );
}
