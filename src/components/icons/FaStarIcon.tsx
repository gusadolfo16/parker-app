import { FaRegStar, FaStar } from 'react-icons/fa';
import Icon from '@/components/primitives/Icon';

export function FaRegStarIcon(props: {
  size?: number,
  className?: string,
}) {
  return <Icon {...props}><FaRegStar /></Icon>;
}

export function FaStarIcon(props: {
  size?: number,
  className?: string,
}) {
  return <Icon {...props}><FaStar /></Icon>;
}
