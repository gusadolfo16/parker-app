'use client';

import HttpStatusPage from '@/components/HttpStatusPage';
import TbRefreshIcon from '@/components/icons/TbRefreshIcon';

export default function GlobalError() {
  return (
    <HttpStatusPage status={<TbRefreshIcon />}>
      Something went wrong
    </HttpStatusPage>
  );
}
