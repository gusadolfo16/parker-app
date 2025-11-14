import { FaRegClock } from 'react-icons/fa';
import Icon from '@/components/primitives/Icon';

export default function FaRegClockIcon(props: {
  size?: number,
  className?: string,
}) {
  return <Icon {...props}><FaRegClock /></Icon>;
}
