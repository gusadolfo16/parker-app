
import { ImCheckmark } from 'react-icons/im';
import { clsx } from 'clsx/lite';

export default function ImCheckmarkIcon({ className, size }: { className?: string, size?: number }) {
  return <ImCheckmark size={size} className={clsx('text-white', className)} />;
}
