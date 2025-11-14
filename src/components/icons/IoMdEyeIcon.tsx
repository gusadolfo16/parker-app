import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import Icon from '@/components/primitives/Icon';

export function IoMdEyeIcon(props: {
  size?: number,
  className?: string,
}) {
  return <Icon {...props}><IoMdEye /></Icon>;
}

export function IoMdEyeOffIcon(props: {
  size?: number,
  className?: string,
}) {
  return <Icon {...props}><IoMdEyeOff /></Icon>;
}
