'use client';

import { clsx } from 'clsx/lite';
import SimpleCheckbox from './primitives/SimpleCheckbox';
import { useAppState } from '@/app/AppState';
import Spinner from './Spinner';

export default function SelectTileOverlay({
  isSelected,
  onSelectChange,
  disabled,
}: {
  isSelected: boolean
  onSelectChange: () => void
  disabled?: boolean
}) {
  const { isPerformingSelectEdit } = useAppState();

  return (
    <div className={clsx(
      'absolute w-full h-full',
      'z-50',
      !disabled && 'cursor-pointer',
      'active:bg-gray-950/40 dark:active:bg-gray-950/60',
      isPerformingSelectEdit && 'pointer-events-none',
    )}>
      <div
        className="w-full h-full"
        onClick={() => !disabled && onSelectChange()}
      >
        <div
          className={clsx(
            'w-full h-full',
            'border-black dark:border-white',
            // eslint-disable-next-line max-len
            'bg-[radial-gradient(169.40%_89.55%_at_94.76%_6.29%,rgba(1,0,0,0.40)_0%,rgba(255,255,255,0.00)_75%)]',
            isSelected && 'border-4',
          )}
        />
      </div>
      {/* Admin Select Action */}
      <div className="absolute top-0 right-0 p-2">
        {isPerformingSelectEdit
          ? isSelected
            ? <Spinner
              size={16}
              color="text"
              className="m-[1px]"
            />
            : null
          : (isSelected || disabled) ? null : <SimpleCheckbox
            className={clsx(
              'text-white',
              // Required to prevent Safari jitter
              'translate-x-[0.1px]',
            )}
            checked={isSelected}
            onChange={onSelectChange}
            disabled={disabled}
          />}
      </div>
    </div>
  );
}
