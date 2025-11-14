import { BiData } from 'react-icons/bi';
import Icon from '@/components/primitives/Icon';

export default function BiDataIcon(props: {
  size?: number,
  className?: string,
}) {
  return <Icon {...props}><BiData /></Icon>;
}
