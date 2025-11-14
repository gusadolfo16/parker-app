import { BiCheckCircle } from 'react-icons/bi';
import Icon from '@/components/primitives/Icon';

export default function BiCheckCircleIcon(props: {
  size?: number,
  className?: string,
}) {
  return <Icon {...props}><BiCheckCircle /></Icon>;
}
