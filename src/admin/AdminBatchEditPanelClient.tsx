'use client';

import { useAppState } from '@/app/AppState';
import { useSelection } from '@/selection/SelectionContext';
import { clsx } from 'clsx/lite';
import { useAppText } from '@/i18n/state/client';
import { FaArrowDown } from 'react-icons/fa';
import FaArrowDownIcon from '@/components/icons/FaArrowDownIcon';
import { Tags } from '@/tag';
import ResponsiveText from '@/components/primitives/ResponsiveText';

export default function AdminBatchEditPanelClient({
  uniqueTags,
  onBatchActionComplete,
}: {
  uniqueTags: Tags,
  onBatchActionComplete: () => void,
}) {
  const {
    selectedPhotoIds,
    isPerformingSelectEdit,
    setIsPerformingSelectEdit,
  } = useAppState();

  const {
    selectionMode,
    selectedPhotos,
    clearSelection,
    confirmSelection,
  } = useSelection();

  const appText = useAppText();

  const renderPhotoCTA = selectedPhotoIds?.length === 0
    ? <>
      <FaArrowDownIcon />
      <ResponsiveText shortText="Select below">
        Select photos below
      </ResponsiveText>
    </>
    : <>
      <FaArrowDownIcon />
      <ResponsiveText shortText="Edit selected">
        Edit {selectedPhotoIds?.length} selected photos
      </ResponsiveText>
    </>;

  return (
    <div className={clsx(
      'absolute bottom-0 left-0 right-0',
      'transition-transform duration-300 ease-in-out transform',
      selectionMode ? 'translate-y-0' : 'translate-y-full',
      'z-20',
      'bg-white dark:bg-gray-900',
      'border-t border-gray-200 dark:border-gray-800',
      'p-2',
    )}>
      <div className={clsx(
        'max-w-screen-md mx-auto',
        'flex items-center justify-between',
      )}>
        <div className={clsx(
          'flex items-center gap-2',
          'text-gray-500 dark:text-gray-400',
        )}>
          {renderPhotoCTA}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="button"
            onClick={() => clearSelection()}
          >
            {appText.admin.cancel}
          </button>
          <button
            className="button"
            onClick={() => setIsPerformingSelectEdit?.(true)}
          >
            {appText.admin.edit}
          </button>
        </div>
      </div>
    </div>
  );
}
