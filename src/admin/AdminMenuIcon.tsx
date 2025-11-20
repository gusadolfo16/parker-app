'use client';

import { clsx } from 'clsx/lite';

export default function AdminMenuIcon({
  isOpen,
}: {
  isOpen?: boolean,
}) {
  return (
    <div className="w-[28px] h-[28px] overflow-hidden">
      <div className={clsx(
        'relative flex flex-col items-center justify-center gap-2',
        'transition-transform duration-300',
        isOpen ? 'translate-y-[6px]' : 'translate-y-[-18px]',
      )}>
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          className="shrink-0"
          height="16"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="48"
            d="m112 268 144 144 144-144M256 392V100"
          />
        </svg>
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          className="shrink-0"
          height="16"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="48"
            d="m112 244 144-144 144 144M256 120v292"
          />
        </svg>
      </div>
    </div>
  );
}