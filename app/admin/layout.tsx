import AdminNav from '@/admin/AdminNav';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const nav = await AdminNav();
  return (
    <div className="mt-4 space-y-4">
      {nav}
      {children}
    </div>
  );
}
