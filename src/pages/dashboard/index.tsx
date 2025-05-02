import { useSession } from "next-auth/react";
import Layout from "@components/Layout";
import ScanTriggerForm from "@components/ScanTriggerForm";

export default function DashboardPage() {
  const sessionResult = useSession();
  const session = sessionResult?.data;

  if (!session) {
    return <div className="p-4 text-center">Not logged in</div>;
  }

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
