'use client';

import { useSelection, clearAndUnlockSelection } from '@/selection/SelectionContext';
import PhotoGrid from '@/photo/PhotoGrid';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import LoaderButton from '@/components/primitives/LoaderButton';
import HiOutlinePhotographIcon from '@/components/icons/HiOutlinePhotographIcon';
import { sendSelectionEmailAction } from '@/emails/actions';
import { HiOutlineMail } from 'react-icons/hi';
import { useAppText } from '@/i18n/state/client';

export default function SelectedPageClient() {
  const { data: session } = useSession();
  const { selectedPhotos, clearSelection } = useSelection();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const t = useAppText();

  const handleClearAndUnlock = async () => {
    if (session?.user?.id) {
      setIsLoading(true);
      const success = await clearAndUnlockSelection(selectedPhotos.map(photo => photo.id));
      if (success) {
        clearSelection();
        toast.success(t.selected.clearSuccess);
        router.push('/');
      } else {
        toast.error(t.selected.clearError);
      }
      setIsLoading(false);
    }
  };

  const handleSendEmail = async () => {
    setIsSendingEmail(true);
    try {
      const result = await sendSelectionEmailAction();
      if (result.success) {
        toast.success(t.selected.emailSuccess.replace('{{count}}', String(result.count)));
      }
    } catch (e: any) {
      toast.error(e.message || t.selected.emailError);
    } finally {
      setIsSendingEmail(false);
    }
  };

  useEffect(() => {
    if (selectedPhotos.length === 0) {
      router.push('/');
    }
  }, [selectedPhotos, router]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-bold">{t.selected.title}</h1>
        <div className="flex gap-2">
          <LoaderButton
            onClick={handleSendEmail}
            isLoading={isSendingEmail}
            disabled={isLoading}
            icon={<HiOutlineMail />}
          >
            {t.selected.sendEmail}
          </LoaderButton>
          <LoaderButton
            onClick={handleClearAndUnlock}
            isLoading={isLoading}
            disabled={isSendingEmail}
          >
            {t.selected.clearUnlock}
          </LoaderButton>
        </div>
      </div>
      {selectedPhotos.length > 0 ? (
        <PhotoGrid photos={selectedPhotos} />
      ) : (
        <div className="min-h-[20rem] sm:min-h-[30rem] flex items-center justify-center">
          <div className="text-center text-gray-500 space-y-2">
            <HiOutlinePhotographIcon size={24} className="mx-auto" />
            <p className="font-bold text-2xl">{t.selected.noPhotos}</p>
            <p>{t.selected.noPhotosDesc}</p>
          </div>
        </div>
      )}
    </div>
  );
}
