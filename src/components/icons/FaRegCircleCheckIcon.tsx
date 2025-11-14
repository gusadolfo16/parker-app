import { FaRegCircleCheck } from 'react-icons/fa6';
import Icon from '@/components/primitives/Icon';

export default function FaRegCircleCheckIcon(props: {
  size?: number,
  className?: string,
}) {
  return <Icon {...props}><FaRegCircleCheck /></Icon>;
}
