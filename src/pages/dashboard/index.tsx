import Layout from "@components/Layout";
import ScanTriggerForm from "@components/ScanTriggerForm";

export default function DashboardPage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl font-semibold">Start a New Scan</h2>

        <div className="bg-white shadow-md border rounded-xl p-6 space-y-4">
          <ScanTriggerForm />
        </div>
      </div>
    </Layout>
  );
}
