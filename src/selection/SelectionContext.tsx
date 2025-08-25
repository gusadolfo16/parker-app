'use client';

import { Photo } from '@/photo';
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface SelectionContextType {
  selectionMode: boolean;
  selectedPhotos: Photo[];
  toggleSelectionMode: () => void;
  togglePhotoSelection: (photo: Photo) => void;
  clearSelection: () => void;
  confirmSelection: () => void; // Placeholder for now
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export const SelectionProvider = ({ children }: { children: ReactNode }) => {
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<Photo[]>([]);

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
  }, []);

  const confirmSelection = useCallback(() => {
    // TODO: Implement actual confirmation logic (e.g., API call to lock photos)
    console.log('Confirmed selection:', selectedPhotos);
    setSelectionMode(false);
    setSelectedPhotos([]);
  }, [selectedPhotos]);

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
