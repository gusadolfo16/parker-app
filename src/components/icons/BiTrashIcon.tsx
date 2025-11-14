import { BiTrash } from 'react-icons/bi';
import Icon from '@/components/primitives/Icon';

export default function BiTrashIcon(props: {
  size?: number,
  className?: string,
}) {
  return <Icon {...props}><BiTrash /></Icon>;
}
