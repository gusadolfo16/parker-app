import { getLockedPhotos } from '@/photo/db/query';
import AdminReportClient from '@/admin/AdminReportClient';

export default async function AdminReportPage() {
  const photos = await getLockedPhotos();

  return (
    <AdminReportClient photos={photos} />
  );
}