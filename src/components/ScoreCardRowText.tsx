
import ScoreCardRow from '@/components/ScoreCardRow';
import { ReactNode } from 'react';
import { HiOutlineDocumentText } from 'react-icons/hi';

export default function ScoreCardRowText({
  label,
  value,
}: {
  label: ReactNode,
  value: ReactNode,
}) {
  return (
    <ScoreCardRow
      icon={<HiOutlineDocumentText size={16} />}
      content={
        <div className="flex justify-between">
          <span>{label}</span>
          <span>{value}</span>
        </div>
      }
    />
  );
}
