import { clsx } from 'clsx/lite';
import { LuCog } from 'react-icons/lu';
import LuCogIcon from '@/components/icons/LuCogIcon';

export default function AdminAppInfoIcon({
  size = 'small',
  className,
}: {
  size?: 'small' | 'large',
  className?: string,
}) {
  return (
    <div className={clsx(
      'inline-flex items-center justify-center',
      size === 'large' ? 'w-8 h-8' : 'w-5 h-5',
      className,
    )}>
      <LuCogIcon
        size={size === 'large' ? 20 : 17}
        className="inline-flex translate-y-[1px]"
        aria-label="App Info"
      />
    </div>
  );
}
