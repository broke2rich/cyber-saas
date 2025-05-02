import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">🚀 Cyber SaaS is Live</h1>
        <p className="text-gray-600 text-lg">Secure your website in one click.</p>
        <Link
          href="/signup"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}
