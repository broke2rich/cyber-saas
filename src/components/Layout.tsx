// src/components/Layout.tsx
import Sidebar from "./sidebar";
import Header from "./Header";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();

  if (!session) {
    return <div className="p-6 text-center">Loading session...</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 px-4 py-8 md:px-10">{children}</main>
      </div>
    </div>
  );
}
