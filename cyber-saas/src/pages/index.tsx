export default function HomePage() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Cyber SaaS is Live</h1>
        <p className="text-gray-600 mt-2">Secure your website in one click.</p>
        <a
          href="/signup"
          className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Get Started
        </a>
      </div>
    );
  }
  