import AdminAppConfigurationClient from './AdminAppConfigurationClient';
import { APP_CONFIGURATION } from '@/app/config';

export default async function AdminAppConfigurationServer({
  simplifiedView,
}: {
  simplifiedView?: boolean
}) {
  return (
    <AdminAppConfigurationClient {...{
      ...APP_CONFIGURATION,
      simplifiedView,
    }} />
  );
}
