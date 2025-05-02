import { useSession, signOut } from "next-auth/react";
import ScanTriggerForm from "@/components/ScanTriggerForm";
import Link from "next/link";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-4">CyberSaaS</h2>
        <nav className="space-y-2">
          <Link href="/dashboard" className="block text-gray-800 hover:text-blue-600">
            Dashboard
          </Link>
          <Link href="/dashboard/history" className="block text-gray-800 hover:text-blue-600">
            Scan History
          </Link>
        </nav>
        <button
          onClick={() => signOut()}
          className="mt-10 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Log Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Welcome, {session?.user?.email || "User"}</h1>
          <div className="bg-white shadow-md rounded p-6">
            <h2 className="text-xl font-semibold mb-4">Start a New Scan</h2>
            <ScanTriggerForm />
          </div>
          <div className="mt-6">
            <Link href="/dashboard/history" className="text-blue-600 hover:underline">
              → View Scan History
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
