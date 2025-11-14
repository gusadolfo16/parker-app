import { ComponentProps, ReactNode, forwardRef } from 'react';
import LinkWithStatus from './LinkWithStatus';
import clsx from 'clsx/lite';

const LinkWithIconLoader = forwardRef<HTMLAnchorElement, Omit<ComponentProps<typeof LinkWithStatus>, 'children'> & {
  icon: ReactNode
  loader: ReactNode
}>(function LinkWithIconLoader({
  className,
  icon,
  loader,
  ...props
}, ref) {
  return (
    <LinkWithStatus
      {...props}
      ref={ref}
      className={clsx('relative', className)}
    >
      {({ isLoading }) => <>
        <span className={clsx(
          'flex transition-opacity',
          isLoading ? 'opacity-0' : 'opacity-100',
        )}>
          {icon}
        </span>
        {isLoading && <span className={clsx(
          'absolute inset-0',
          'flex items-center justify-center',
        )}>
          {loader}
        </span>}
      </>}
    </LinkWithStatus>
  );
});

export default LinkWithIconLoader;
