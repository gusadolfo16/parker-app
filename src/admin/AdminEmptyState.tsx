import { ReactNode } from 'react';
import { clsx } from 'clsx/lite';
import IoInformationCircleOutlineIcon from '@/components/icons/IoInformationCircleOutlineIcon';

export default function AdminEmptyState({
  children,
  icon,
}: {
  children: ReactNode,
  icon?: ReactNode,
}) {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-textLight">
      <div className={clsx(
        'w-16 h-16 flex items-center justify-center',
        'text-main',
        'border border-main rounded-xl shadow-xs',
      )}>
        {icon ?? <IoInformationCircleOutlineIcon />}
      </div>
      {children}
    </div>
  );
}