'use client';

import { useSelection } from '@/selection/SelectionContext';
import PhotoGrid from '@/photo/PhotoGrid';
import PhotosEmptyState from '@/photo/PhotosEmptyState';
import AppGrid from '@/components/AppGrid';
import { AppTextState as AppText } from '@/i18n/state';

export default function SelectedPageClient({ appText }: { appText: AppText }) {
  const { selectedPhotos } = useSelection();

  return (
    <AppGrid
      contentMain={
        selectedPhotos.length > 0
          ? <PhotoGrid photos={selectedPhotos} />
          : <PhotosEmptyState appText={appText} />
      }
    />
  );
}
