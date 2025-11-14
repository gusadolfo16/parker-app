'use client';

import SubmitButtonWithStatus from '@/components/SubmitButtonWithStatus';
import { ComponentProps } from 'react';
import { clsx } from 'clsx/lite';
import { useAppState } from '@/app/AppState';
import BiTrashIcon from '@/components/icons/BiTrashIcon';

export default function DeleteFormButton({
  clearLocalState,
  className,
  ...rest
}: ComponentProps<typeof SubmitButtonWithStatus> & {
  clearLocalState?: boolean
}) {
  const { invalidateSwr } = useAppState();

  return (
    <SubmitButtonWithStatus
      {...rest}
      title="Delete"
      icon={<BiTrashIcon size={16} />}
      spinnerColor="text"
      className={clsx(
        className,
        'text-red-500! dark:text-red-500!',
      )}
      onFormSubmit={() => {
        if (clearLocalState) {
          invalidateSwr?.();
        }
      }}
    />
  );
}
