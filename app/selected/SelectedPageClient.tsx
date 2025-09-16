'use client';

import { useSelection } from '@/selection/SelectionContext';
import PhotoGrid from '@/photo/PhotoGrid';
import AppGrid from '@/components/AppGrid';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoaderButton from '@/components/primitives/LoaderButton';
import { useState } from 'react';
import { HiOutlinePhotograph } from 'react-icons/hi';

export default function SelectedPageClient() {
  const { selectedPhotos, clearAndUnlockSelection } = useSelection();
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClearAndUnlock = async () => {
    if (session?.user?.id) {
      setIsLoading(true);
      const success = await clearAndUnlockSelection(session.user.id);
      if (success) {
        router.push('/');
      } else {
        setIsLoading(false);
      }
    }
  };

  return (
    <AppGrid
      contentMain={
        <div className="space-y-4">
          {selectedPhotos.length > 0 ? (
            <>
              <div className="flex justify-end">
                <LoaderButton
                  isLoading={isLoading}
                  onClick={handleClearAndUnlock}
                >
                  Clear & Unlock Selection
                </LoaderButton>
              </div>
              <PhotoGrid photos={selectedPhotos} />
            </>
          ) : (
            <div className="min-h-[20rem] sm:min-h-[30rem] flex items-center justify-center">
              <div className="text-center text-gray-500 space-y-2">
                <HiOutlinePhotograph size={24} className="mx-auto" />
                <p className="font-bold text-2xl">No photos selected</p>
                <p>Your selected photos will appear here.</p>
              </div>
            </div>
          )}
        </div>
      }
    />
  );
}
