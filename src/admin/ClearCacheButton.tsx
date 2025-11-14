'use client';

import SubmitButtonWithStatus from '@/components/SubmitButtonWithStatus';
import { clearCacheAction } from '@/photo/actions';
import { useAppState } from '@/app/AppState';
import { useAppText } from '@/i18n/state/client';
import BiTrashIcon from '@/components/icons/BiTrashIcon';

export default function ClearCacheButton() {
  const { invalidateSwr } = useAppState();
  const appText = useAppText();
  return (
    <form action={clearCacheAction}>
      <SubmitButtonWithStatus
        icon={<BiTrashIcon size={16} />}
        hideText="never"
        onFormSubmit={invalidateSwr}
      >
        {appText.admin.clearCache}
      </SubmitButtonWithStatus>
    </form>
  );
}
