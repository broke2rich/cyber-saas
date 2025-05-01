import { useEffect, useState } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { signOut } from "next-auth/react";

type Scan = {
  id: string;
  domain: string;
  createdAt: string;
  result: {
    vulnerabilities: any[];
    emailSecurity: {
      spf: boolean;
      dkim: boolean;
      dmarc: boolean;
    };
  };
};

export default function ScanHistory() {
  const [scans, setScans] = useState<Scan[]>([]);

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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Scan History</h1>
        <button
          onClick={() => signOut()}
          className="text-red-600 underline text-sm"
        >
          Log out
        </button>
      </div>

      {scans.length === 0 ? (
        <p>No scans yet.</p>
      ) : (
        <ul className="space-y-4">
          {scans.map((scan) => (
            <li key={scan.id} className="border p-4 rounded shadow">
              <p className="text-lg font-medium">{scan.domain}</p>
              <p className="text-sm text-gray-500">
                Scanned at: {new Date(scan.createdAt).toLocaleString()}
              </p>

              <div className="mt-2 space-y-1 text-sm">
                <p className="font-semibold">Email Security:</p>
                <ul className="ml-4 list-disc">
                  <li>SPF: {scan.result.emailSecurity.spf ? "✅ Present" : "❌ Missing"}</li>
                  <li>DKIM: {scan.result.emailSecurity.dkim ? "✅ Present" : "❌ Missing"}</li>
                  <li>DMARC: {scan.result.emailSecurity.dmarc ? "✅ Present" : "❌ Missing"}</li>
                </ul>

                <p className="mt-3 font-semibold">Top 3 Vulnerabilities:</p>
                <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
                  {JSON.stringify(scan.result.vulnerabilities.slice(0, 3), null, 2)}
                </pre>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Protects the page — redirect if not logged in
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { session } };
};
