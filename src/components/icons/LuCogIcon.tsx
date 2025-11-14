import { LuCog } from 'react-icons/lu';

export default function LuCogIcon({ size, className, 'aria-label': ariaLabel }: { size: number, className: string, 'aria-label': string }) {
  return <LuCog size={size} className={className} aria-label={ariaLabel} />;
}
