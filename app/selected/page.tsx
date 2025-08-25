import { useSelection } from '@/selection/SelectionContext';
import PhotoGrid from '@/photo/PhotoGrid';
import PhotosEmptyState from '@/photo/PhotosEmptyState';
import AppGrid from '@/components/AppGrid';
import { getAppText } from '@/i18n/state/server';

export default async function SelectedPage() {
  const { selectedPhotos } = useSelection();
  const appText = await getAppText();

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
