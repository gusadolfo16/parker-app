import { TbChecklist } from 'react-icons/tb';
import Icon from '@/components/primitives/Icon';

export default function TbChecklistIcon(props: {
  size?: number,
  className?: string,
}) {
  return <Icon {...props}><TbChecklist /></Icon>;
}
