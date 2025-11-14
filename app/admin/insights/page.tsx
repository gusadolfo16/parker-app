import AdminAppInsights from '@/admin/insights/AdminAppInsights';
import AdminInfoPage from '@/admin/AdminInfoPage';

export default async function AdminInsightsPage() {
  const insights = await AdminAppInsights();
  return <AdminInfoPage>
    {insights}
  </AdminInfoPage>;
}
