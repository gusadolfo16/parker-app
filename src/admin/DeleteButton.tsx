import LoaderButton from '@/components/primitives/LoaderButton';
import { ComponentProps } from 'react';
import { clsx } from 'clsx/lite';
import BiTrashIcon from '@/components/icons/BiTrashIcon';

export default function DeleteButton({
  className,
  ...rest
}: ComponentProps<typeof LoaderButton>) {
  return (
    <LoaderButton
      {...rest}
      title="Delete"
      icon={<BiTrashIcon size={16} />}
      spinnerColor="text"
      className={clsx(
        'text-red-500! dark:text-red-500!',
        className,
      )}
    />
  );
}
