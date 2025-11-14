import { ReactNode } from 'react';
import BiErrorAltIcon from './icons/BiErrorAltIcon';
import Note from './Note';

export default function ErrorNote({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <Note
      color="red"
      padding="tight"
      className={className}
      icon={<BiErrorAltIcon size={18} className="translate-x-[0.5px]" />}
    >
      {children}
    </Note>
  );
}
