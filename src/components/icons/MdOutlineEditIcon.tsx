import { MdOutlineModeEdit, MdOutlineDelete } from 'react-icons/md';
import Icon from '@/components/primitives/Icon';

export function MdOutlineModeEditIcon(props: {
  size?: number,
  className?: string,
}) {
  return <Icon {...props}><MdOutlineModeEdit /></Icon>;
}

export function MdOutlineDeleteIcon(props: {
  size?: number,
  className?: string,
}) {
  return <Icon {...props}><MdOutlineDelete /></Icon>;
}
