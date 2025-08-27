import Container from '@/components/Container';
import AppGrid from '@/components/AppGrid';
import {
  IS_SITE_READY,
  PRESERVE_ORIGINAL_UPLOADS,
} from '@/app/config';
import AdminAppConfiguration from '@/admin/config/AdminAppConfiguration';
import { clsx } from 'clsx/lite';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { revalidateAdminPathAction } from '@/admin/actions';
import SignInOrUploadClient from '@/admin/SignInOrUploadClient';
import Link from 'next/link';
import { PATH_ADMIN_CONFIGURATION } from '@/app/path';
import { AppTextState as AppText } from '@/i18n/state';

export default function PhotosEmptyState({
  appText,
}: {
  appText: AppText['onboarding']
}) {
  return (
    <AppGrid
      contentMain={
        <Container
          key="PhotosEmptyState"
          className="min-h-[20rem] sm:min-h-[30rem] px-8"
          padding="loose"
        >
          <HiOutlinePhotograph
            className="text-medium"
            size={24}
          />
          <div className={clsx(
            'font-bold text-2xl',
            'text-gray-700 dark:text-gray-200',
          )}>
            {!IS_SITE_READY
              ? appText.setupIncomplete
              : appText.setupComplete}
          </div>
          {!IS_SITE_READY
            ? <AdminAppConfiguration simplifiedView />
            : <div className="max-w-md text-center space-y-6">
              <SignInOrUploadClient
                shouldResize={!PRESERVE_ORIGINAL_UPLOADS}
                onLastUpload={revalidateAdminPathAction}
              />
              <div>
                {appText.setupConfig}
                {' '}
                <Link
                  href={PATH_ADMIN_CONFIGURATION}
                  className="text-main hover:underline"
                >
                  /admin/configuration
                </Link>
              </div>
            </div>}
        </Container>
      }
    />
  );
};
