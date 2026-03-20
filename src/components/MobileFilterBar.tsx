'use client';

/* eslint-disable max-len */

import { clsx } from 'clsx/lite';
import { ReactNode } from 'react';

export default function MobileFilterBar({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={clsx(
      'flex overflow-x-auto no-scrollbar gap-2 pb-2',
      'mask-linear-fade', // Optional: add a fade effect if you have this utility
      className,
    )}>
      {children}
    </div>
  );
}
