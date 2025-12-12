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

export default function SelectedPageClient() {
  const { data: session } = useSession();
  const { selectedPhotos, clearSelection } = useSelection();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const handleClearAndUnlock = async () => {
    if (session?.user?.id) {
      setIsLoading(true);
      const success = await clearAndUnlockSelection(selectedPhotos.map(photo => photo.id));
      if (success) {
        clearSelection();
        toast.success('Selection cleared and unlocked');
        router.push('/');
      } else {
        toast.error('Failed to clear and unlock selection');
      }
      setIsLoading(false);
    }
  };

  const handleSendEmail = async () => {
    setIsSendingEmail(true);
    try {
      const result = await sendSelectionEmailAction();
      if (result.success) {
        toast.success(`Email sent with ${result.count} photos!`);
      }
    } catch (e: any) {
      toast.error(e.message || 'Failed to send email');
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
        <h1 className="text-2xl font-bold">Selected Photos</h1>
        <div className="flex gap-2">
          <LoaderButton
            onClick={handleSendEmail}
            isLoading={isSendingEmail}
            disabled={isLoading}
            icon={<HiOutlineMail />}
          >
            Enviar a mi correo
          </LoaderButton>
          <LoaderButton
            onClick={handleClearAndUnlock}
            isLoading={isLoading}
            disabled={isSendingEmail}
          >
            Clear & Unlock Selection
          </LoaderButton>
        </div>
      </div>
      {selectedPhotos.length > 0 ? (
        <PhotoGrid photos={selectedPhotos} />
      ) : (
        <div className="min-h-[20rem] sm:min-h-[30rem] flex items-center justify-center">
          <div className="text-center text-gray-500 space-y-2">
            <HiOutlinePhotographIcon size={24} className="mx-auto" />
            <p className="font-bold text-2xl">No photos selected</p>
            <p>Your selected photos will appear here.</p>
          </div>
        </div>
      )}
    </div>
  );
}
