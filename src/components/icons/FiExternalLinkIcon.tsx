import { FiExternalLink } from 'react-icons/fi';
import Icon from '@/components/primitives/Icon';

export default function FiExternalLinkIcon(props: {
  size?: number,
  className?: string,
}) {
  return <Icon {...props}><FiExternalLink /></Icon>;
}
