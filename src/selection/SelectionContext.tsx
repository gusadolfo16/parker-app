'use client';

import { Photo } from '@/photo';
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from 'react';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

interface SelectionContextType {
  selectionMode: boolean;
  selectedPhotos: Photo[];
  toggleSelectionMode: () => void;
  togglePhotoSelection: (photo: Photo) => void;
  clearSelection: () => void;
  confirmSelection: () => Promise<boolean>;
  clearAndUnlockSelection: () => Promise<boolean>;
}

const SelectionContext = createContext<SelectionContextType | undefined>(
  undefined,
);

export const clearAndUnlockSelection = async (photoIds: string[]): Promise<boolean> => {
  if (photoIds.length === 0) {
    toast.error('No photos to unlock.');
    return false;
  }

  try {
    const response = await fetch('/api/selection', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ photoIds }),
    });

    if (response.ok) {
      toast.success('Selection cleared and photos unlocked!');
      return true;
    } else {
      toast.error('Failed to unlock photos.');
      return false;
    }
  } catch (error) {
    console.error('Error unlocking selection:', error);
    toast.error('An error occurred while unlocking photos.');
    return false;
  }
};

export const SelectionProvider = ({ children }: { children: ReactNode }) => {
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<Photo[]>([]);

  const toggleSelectionMode = useCallback(() => {
    setSelectionMode(prevMode => {
      const newMode = !prevMode;
      if (!newMode) {
        // Clear selection when exiting selection mode
        setSelectedPhotos([]);
      }
      return newMode;
    });
  }, [setSelectedPhotos]);

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

  const clearSelection = useCallback(async () => {
    const photoIds = selectedPhotos.map(photo => photo.id);

    if (photoIds.length > 0) {
      try {
        const response = await fetch('/api/selection', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ photoIds }),
        });
        if (!response.ok) {
          toast.error('Failed to unlock photos.');
        }
      } catch (error) {
        console.error('Error clearing selection:', error);
        toast.error('An error occurred while unlocking photos.');
      }
    }

    setSelectedPhotos([]);
    setSelectionMode(false);
  }, [selectedPhotos, setSelectedPhotos, setSelectionMode]);

  const confirmSelection = useCallback(async (): Promise<boolean> => {
    const photoIds = selectedPhotos.map(photo => photo.id);

    if (photoIds.length === 0) {
      toast.error('No photos selected.');
      return false;
    }

    setSelectionMode(false);

    try {
      const response = await fetch('/api/selection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoIds }),
      });

      if (response.ok) {
        toast.success('Selection confirmed!');
        return true;
      } else {
        console.error('Failed to confirm selection:', response.statusText);
        toast.error(`Failed to confirm selection: ${response.statusText}`);
        return false;
      }
    } catch (error) {
      console.error('Error confirming selection:', error);
      toast.error('An error occurred while confirming the selection.');
      return false;
    }
  }, [selectedPhotos, setSelectedPhotos, setSelectionMode]);

  return (
    <SelectionContext.Provider
      value={{
        selectionMode,
        selectedPhotos,
        toggleSelectionMode,
        togglePhotoSelection,
        clearSelection,
        confirmSelection,
        clearAndUnlockSelection: () => clearAndUnlockSelection(selectedPhotos.map(p => p.id)),
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