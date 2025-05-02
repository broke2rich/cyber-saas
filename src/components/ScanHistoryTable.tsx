import React from "react";
import { Download } from "lucide-react";
import { Button } from "@components/ui/button";

interface Scan {
  id: string;
  domain: string;
  result: {
    vulnerabilities: any[];
    emailSecurity: {
      spf: boolean;
      dkim: boolean;
      dmarc: boolean;
    };
  };
  createdAt: string;
}

interface Props {
  scans: Scan[];
}

export default function ScanHistoryTable({ scans }: Props) {
  const exportCSV = () => {
    const headers = ["Domain", "Vulnerabilities", "SPF", "DKIM", "DMARC", "Created At"];
    const rows = scans.map((scan) => [
      scan.domain,
      scan.result.vulnerabilities.length,
      scan.result.emailSecurity.spf ? "✅" : "❌",
      scan.result.emailSecurity.dkim ? "✅" : "❌",
      scan.result.emailSecurity.dmarc ? "✅" : "❌",
      new Date(scan.createdAt).toLocaleString(),
    ]);

    const csvContent =
      [headers, ...rows]
        .map((e) => e.map((v) => `"${v}"`).join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "scan-history.csv";
    link.click();
  };

  return (
    <div className="bg-white dark:bg-zinc-900 p-4 shadow rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Scan History</h2>
        <Button onClick={exportCSV} variant="outline" className="flex items-center gap-2">
          <Download size={16} /> Export CSV
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-zinc-100 dark:bg-zinc-800">
            <tr>
              <th className="text-left p-2">Domain</th>
              <th className="text-left p-2">Vulnerabilities</th>
              <th className="text-left p-2">SPF</th>
              <th className="text-left p-2">DKIM</th>
              <th className="text-left p-2">DMARC</th>
              <th className="text-left p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {scans.map((scan) => (
              <tr
                key={scan.id}
                className="border-t border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              >
                <td className="p-2">{scan.domain}</td>
                <td className="p-2">{scan.result.vulnerabilities.length}</td>
                <td className="p-2">{scan.result.emailSecurity.spf ? "✅" : "❌"}</td>
                <td className="p-2">{scan.result.emailSecurity.dkim ? "✅" : "❌"}</td>
                <td className="p-2">{scan.result.emailSecurity.dmarc ? "✅" : "❌"}</td>
                <td className="p-2">{new Date(scan.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
