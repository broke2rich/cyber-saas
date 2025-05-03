import Layout from "@components/Layout";
import Head from "next/head";
import Link from "next/link";

export default function HomePage() {
  return (
    <Layout>
      <Head>
        <title>CyberSaaS | Secure Your Stack</title>
      </Head>

      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <h1 className="text-5xl font-bold mb-6">Welcome to CyberSaaS</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-xl">
          Enterprise-grade vulnerability scanning and compliance made simple. Start scanning your domain in seconds.
        </p>
        <Link href="/dashboard">
          <a className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-full transition">
            Go to Dashboard
          </a>
        </Link>
      </div>
    </Layout>
  );
}
