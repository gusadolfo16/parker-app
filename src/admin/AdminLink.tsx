import Link from 'next/link';
import { ReactNode } from 'react';
import { clsx } from 'clsx/lite';
import FiExternalLinkIcon from '@/components/icons/FiExternalLinkIcon';

export default function AdminLink({
  children,
  href,
  className,
  external,
  externalIcon = true,
  prefetch = true,
}: {
  children: ReactNode,
  href: string,
  className?: string,
  external?: boolean,
  externalIcon?: boolean,
  prefetch?: boolean,
}) {
  return (
    <Link
      href={href}
      className={clsx(
        'text-main hover:text-main-dark',
        'transition-all duration-200 ease-in-out',
        className,
      )}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      {...(!external && { prefetch })}
    >
      {children}
      {external && externalIcon && <span className="whitespace-nowrap">
        &nbsp;
        <FiExternalLinkIcon
          size={14}
          className="inline translate-y-[-1.5px]"
        />
      </span>}
    </Link>
  );
}
