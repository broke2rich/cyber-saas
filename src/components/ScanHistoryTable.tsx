// src/components/ScanHistoryTable.tsx

import React, { useState } from "react";
import { format } from "date-fns";

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

interface Props {
  scans: Scan[];
}

const ScanHistoryTable: React.FC<Props> = ({ scans }) => {
  const [filter, setFilter] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const filteredScans = scans
    .filter((scan) =>
      scan.domain.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) =>
      sortAsc
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const exportCSV = () => {
    const rows = [
      ["Domain", "Date", "SPF", "DKIM", "DMARC", "Vulnerabilities"],
      ...filteredScans.map((scan) => [
        scan.domain,
        scan.createdAt,
        scan.result.emailSecurity.spf ? "✓" : "✗",
        scan.result.emailSecurity.dkim ? "✓" : "✗",
        scan.result.emailSecurity.dmarc ? "✓" : "✗",
        scan.result.vulnerabilities.length,
      ]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "scan_history.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="rounded border shadow bg-white p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Filter by domain"
          className="border rounded p-2 w-64"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            onClick={() => setSortAsc((prev) => !prev)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Sort {sortAsc ? "↑" : "↓"}
          </button>
          <button
            onClick={exportCSV}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Domain</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">SPF</th>
              <th className="p-2 border">DKIM</th>
              <th className="p-2 border">DMARC</th>
              <th className="p-2 border">Vulns</th>
            </tr>
          </thead>
          <tbody>
            {filteredScans.map((scan) => (
              <tr key={scan.id} className="hover:bg-gray-50">
                <td className="p-2 border">{scan.domain}</td>
                <td className="p-2 border">
                  {format(new Date(scan.createdAt), "yyyy-MM-dd HH:mm")}
                </td>
                <td className="p-2 border text-center">
                  {scan.result.emailSecurity.spf ? "✓" : "✗"}
                </td>
                <td className="p-2 border text-center">
                  {scan.result.emailSecurity.dkim ? "✓" : "✗"}
                </td>
                <td className="p-2 border text-center">
                  {scan.result.emailSecurity.dmarc ? "✓" : "✗"}
                </td>
                <td className="p-2 border text-center">
                  {scan.result.vulnerabilities.length}
                </td>
              </tr>
            ))}
            {filteredScans.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No scans found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScanHistoryTable;
