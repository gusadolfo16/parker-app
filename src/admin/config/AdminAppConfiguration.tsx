import { Suspense } from 'react';
import AdminAppConfigurationServer from './AdminAppConfigurationServer';

export default async function AdminAppConfiguration({
  simplifiedView,
}: {
  simplifiedView?: boolean
}) {
  return (
    <Suspense fallback={null}>
      {await AdminAppConfigurationServer({ simplifiedView })}
    </Suspense>
  );
}
