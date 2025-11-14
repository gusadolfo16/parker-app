import { clsx } from 'clsx/lite';
import { UrlAddStatus } from './AdminUploadsClient';
import Spinner from '@/components/Spinner';
import FaRegCircleCheckIcon from '@/components/icons/FaRegCircleCheckIcon';
import LiaTimesSolidIcon from '@/components/icons/LiaTimesSolidIcon';
import { useAppText } from '@/i18n/state/client';
import Link from 'next/link';
import { pathForAdminUploadUrl } from '@/app/path';
import { Fragment } from 'react';
import { formatFileSize } from '@/utility/size';

export default function AdminUploadsTableRow({
  url,
  fileName,
  size,
  status,
  statusMessage,
  progress,
}: UrlAddStatus) {
  const appText = useAppText();
  return (
    <div className={clsx(
      'flex items-center',
      'text-sm',
      'py-1.5 px-2',
      'gap-2',
      'border-b border-gray-200 dark:border-gray-800',
      'last:border-b-0',
    )}>
      <div className="flex-grow flex-shrink-0 w-full max-w-[10rem]">
        <Link
          href={pathForAdminUploadUrl(url, fileName)}
          className="text-main hover:text-main-dark"
        >
          {fileName}
        </Link>
        {size &&
          <div className="text-extra-dim">
            {formatFileSize(parseInt(size))}
          </div>}
      </div>
      <div className="flex-grow-0 flex-shrink-0 w-[6rem]">
        {status === 'added'
          ? <div className="flex items-center gap-1.5 text-main">
            <FaRegCircleCheckIcon size={18} />
            {appText.admin.uploading}
          </div>
          : status === 'failed'
            ? <div className="flex items-center gap-1.5 text-red-500">
              <LiaTimesSolidIcon size={18} />
              {appText.admin.uploading}
            </div>
            : status === 'adding'
              ? <div className="flex items-center gap-1.5 text-dim">
                <Spinner size={18} />
                {appText.admin.uploading}
              </div>
              : <div className="text-dim">
                {appText.admin.uploading}
              </div>}
      </div>
      <div className="flex-grow-0 flex-shrink-0 w-[10rem]">
        {statusMessage &&
          <div className="text-extra-dim">
            {statusMessage}
          </div>}
        {progress !== undefined && progress < 1 &&
          <div className="w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full">
            <div className="h-full bg-main rounded-full"
              style={{ width: `${progress * 100}%` }}
            />
          </div>}
      </div>
    </div>
  );
}
