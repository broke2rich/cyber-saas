// src/pages/dashboard/history.tsx

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Layout from "@components/Layout";
import ScanHistoryTable from "@components/ScanHistoryTable";

interface Scan {
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
}

export default function HistoryPage() {
  const { data: session } = useSession();
  const [scans, setScans] = useState<Scan[]>([]);

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const res = await axios.get<Scan[]>("/api/scan/history");
        setScans(res.data as Scan[]);
      } catch (err) {
        console.error("Failed to fetch scan history", err);
      }
    };

    fetchScans();
  }, []);

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Scan History</h1>
        <ScanHistoryTable scans={scans} />
      </div>
    </Layout>
  );
}
