import AdminInfoPage from '@/admin/AdminInfoPage';
import AdminAppConfiguration from '@/admin/config/AdminAppConfiguration';
import { getAppText } from '@/i18n/state/server';
import { Suspense } from 'react';

export default async function AdminConfigurationPage() {
  const appText = await getAppText();

  return (
    <AdminInfoPage
      title={appText.admin.appConfig}
    >
      <Suspense fallback={null}>
        {/* eslint-disable-next-line max-len */}
        {appText.onboarding.setupConfig}
      </Suspense>
      {await AdminAppConfiguration({ simplifiedView: false })}
    </AdminInfoPage>
  );
}
