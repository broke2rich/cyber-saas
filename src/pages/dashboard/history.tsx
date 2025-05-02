import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import { saveAs } from "file-saver";

export const getServerSideProps = async () => {
  return { props: {} };
};

type Scan = {
  id: string;
  domain: string;
  createdAt: string;
  result: any;
};

export default function ScanHistory() {
  const session = useSession().data;
  const [scans, setScans] = useState<Scan[]>([]);
  const [filter, setFilter] = useState("");
  const [sortNewest, setSortNewest] = useState(true);

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const res = await axios.get("/api/scan/history");
        setScans(res.data as Scan[]);
      } catch (err) {
        console.error("Failed to fetch scan history", err);
      }
    };
    fetchScans();
  }, []);

  const filteredScans = scans
    .filter((scan) => scan.domain.includes(filter))
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortNewest ? dateB - dateA : dateA - dateB;
    });

  const exportCSV = () => {
    const headers = ["Domain", "Created At"];
    const rows = filteredScans.map(scan => [scan.domain, new Date(scan.createdAt).toLocaleString()]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "scan-history.csv");
  };

  if (!session) {
    return <p className="p-6">Loading session...</p>;
  }

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
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Scan History</h1>

          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              placeholder="Filter by domain..."
              className="border p-2 rounded w-1/2"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <div className="space-x-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setSortNewest(!sortNewest)}
              >
                Sort: {sortNewest ? "Newest" : "Oldest"}
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={exportCSV}
              >
                Export CSV
              </button>
            </div>
          </div>

          {filteredScans.length === 0 ? (
            <p className="text-gray-600">No scans found.</p>
          ) : (
            <ul className="space-y-4">
              {filteredScans.map((scan) => (
                <li
                  key={scan.id}
                  className="bg-white shadow rounded p-4 border border-gray-200"
                >
                  <p className="font-semibold">Domain: {scan.domain}</p>
                  <p className="text-sm text-gray-600">
                    Created: {new Date(scan.createdAt).toLocaleString()}
                  </p>
                  <pre className="mt-2 text-sm text-gray-700 bg-gray-100 p-2 rounded overflow-x-auto">
                    {JSON.stringify(scan.result, null, 2)}
                  </pre>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
