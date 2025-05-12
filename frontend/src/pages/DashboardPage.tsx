
import Dashboard from "@/components/Dashboard/Dashboard";
import Layout from "@/components/Layout/Layout";

export default function DashboardPage() {
  return (
    <Layout requireAuth>
      <div className="container max-w-screen-xl mx-auto">
        <Dashboard />
      </div>
    </Layout>
  );
}
