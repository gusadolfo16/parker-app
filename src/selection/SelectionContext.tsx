'use client';

import { Photo } from '@/photo';
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';

interface SelectionContextType {
  selectionMode: boolean;
  selectedPhotos: Photo[];
  toggleSelectionMode: () => void;
  togglePhotoSelection: (photo: Photo) => void;
  clearSelection: () => void;
  confirmSelection: () => void;
}

const SelectionContext = createContext<SelectionContextType | undefined>(
  undefined,
);

export const SelectionProvider = ({ children }: { children: ReactNode }) => {
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<Photo[]>([]);
  const router = useRouter();

  const toggleSelectionMode = useCallback(() => {
    setSelectionMode(prevMode => !prevMode);
    if (selectionMode) {
      // Clear selection when exiting selection mode
      setSelectedPhotos([]);
    }
  }, [selectionMode]);

  const togglePhotoSelection = useCallback((photo: Photo) => {
    setSelectedPhotos(prevSelected => {
      const isSelected = prevSelected.some(p => p.id === photo.id);
      if (isSelected) {
        return prevSelected.filter(p => p.id !== photo.id);
      } else {
        return [...prevSelected, photo];
      }
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedPhotos([]);
    setSelectionMode(false);
  }, []);

  const confirmSelection = useCallback(async () => {
    const photoIds = selectedPhotos.map(photo => photo.id);
    try {
      const response = await fetch('/api/selection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ photoIds }),
      });

      if (response.ok) {
        console.log('Selection confirmed and sent to API');
        router.push('/selected');
        setSelectionMode(false);
      } else {
        console.error('Failed to confirm selection:', response.statusText);
      }
    } catch (error) {
      console.error('Error confirming selection:', error);
    }
  }, [selectedPhotos, router]);

  return (
    <SelectionContext.Provider
      value={{
        selectionMode,
        selectedPhotos,
        toggleSelectionMode,
        togglePhotoSelection,
        clearSelection,
        confirmSelection,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (context === undefined) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
};