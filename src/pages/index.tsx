// src/pages/index.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-extrabold mb-4 text-center">Cyber SaaS is Live</h1>
      <p className="text-lg text-gray-300 mb-6 text-center">
        Secure your website in one click.
      </p>
      <Link
        href="/signup"
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition"
      >
        Get Started
      </Link>
    </div>
  );
}
