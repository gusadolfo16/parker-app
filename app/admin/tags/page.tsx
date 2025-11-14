import AdminTagTable from '@/admin/AdminTagTable';
import AppGrid from '@/components/AppGrid';
import { getUniqueTags } from '@/photo/db/query';

export default async function AdminTagsPage() {
  const tags = await getUniqueTags().catch(() => []);
  const tagTable = await AdminTagTable({ tags });

  return (
    <AppGrid
      contentMain={
        <div className="space-y-6">
          <div className="space-y-4">
            {tagTable}
          </div>
        </div>}
    />
  );
}
