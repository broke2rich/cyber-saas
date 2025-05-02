// src/components/ScanTriggerForm.tsx

import { useState } from "react";
import axios from "axios";

export default function ScanTriggerForm() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post<{ results: any[] }>("/api/scan/trigger", { domain });
      setResults(res.data.results);
    } catch (err) {
      alert("Scan failed. See console.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-xl mx-auto mt-6">
      <form onSubmit={handleScan} className="space-y-4">
        <input
          type="text"
          placeholder="example.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? "Scanning..." : "Start Scan"}
        </button>
      </form>

      {results.length > 0 && (
        <div className="mt-6 space-y-3">
          <h2 className="text-xl font-semibold">Scan Results:</h2>
          {results.map((r, i) => (
            <div key={i} className="border p-4 rounded">
              <p className="font-bold">{r.info.name}</p>
              <p className="text-sm text-gray-500">{r.host}</p>
              <p className="text-sm">Severity: <strong>{r.info.severity}</strong></p>
              <p className="text-xs text-gray-400">{r.timestamp}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
