import { LuDatabaseBackup } from 'react-icons/lu';
import Icon from '@/components/primitives/Icon';

export default function LuDatabaseBackupIcon(props: {
  size?: number,
  className?: string,
}) {
  return <Icon {...props}><LuDatabaseBackup /></Icon>;
}
