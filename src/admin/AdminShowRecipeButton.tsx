import LoaderButton from '@/components/primitives/LoaderButton';
import { useAppText } from '@/i18n/state/client';
import { TbChecklist } from 'react-icons/tb';
import TbChecklistIcon from '@/components/icons/TbChecklistIcon';

export default function AdminShowRecipeButton({
  onClick,
}: {
  onClick: () => void,
}) {
  const appText = useAppText();
  return (
    <LoaderButton
      icon={<TbChecklistIcon
        size={17}
        className="translate-y-[1px]"
      />}
      onClick={onClick}
    >
      {appText.category.recipe}
    </LoaderButton>
  );
}
