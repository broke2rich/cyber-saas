import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Layout from "@components/Layout";
import ScanHistoryTable from "@components/ScanHistoryTable";

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
    summary?: string;
  };
};

export default function ScanHistoryPage() {
  const { data: session } = useSession();
  const [scans, setScans] = useState<Scan[]>([]);

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const res = await axios.get("/api/scan/history");
        if (res?.data) setScans(res.data);
      } catch (err) {
        console.error("Failed to fetch scan history", err);
      }
    };

    fetchScans();
  }, []);

  return (
    <Layout>
      <div className="p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-4">Scan History</h1>
        <ScanHistoryTable scans={scans} />
      </div>
    </Layout>
  );
}
