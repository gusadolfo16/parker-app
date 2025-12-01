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

const SELECTION_MODE_KEY = 'parker_selection_mode';
const SELECTED_PHOTOS_KEY = 'parker_selected_photos';

export const SelectionProvider = ({ children }: { children: ReactNode }) => {
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<Photo[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Restore selection state from sessionStorage on mount
  useEffect(() => {
    try {
      const savedMode = sessionStorage.getItem(SELECTION_MODE_KEY);
      const savedPhotos = sessionStorage.getItem(SELECTED_PHOTOS_KEY);

      if (savedMode === 'true') {
        setSelectionMode(true);
      }

      if (savedPhotos) {
        const photos = JSON.parse(savedPhotos);
        setSelectedPhotos(photos);
      }
    } catch (error) {
      console.error('Error restoring selection state:', error);
    }
    setIsHydrated(true);
  }, []);

  // Persist selection mode to sessionStorage
  useEffect(() => {
    if (!isHydrated) return;

    try {
      if (selectionMode) {
        sessionStorage.setItem(SELECTION_MODE_KEY, 'true');
      } else {
        sessionStorage.removeItem(SELECTION_MODE_KEY);
      }
    } catch (error) {
      console.error('Error persisting selection mode:', error);
    }
  }, [selectionMode, isHydrated]);

  // Persist selected photos to sessionStorage
  useEffect(() => {
    if (!isHydrated) return;

    try {
      if (selectedPhotos.length > 0) {
        sessionStorage.setItem(SELECTED_PHOTOS_KEY, JSON.stringify(selectedPhotos));
      } else {
        sessionStorage.removeItem(SELECTED_PHOTOS_KEY);
      }
    } catch (error) {
      console.error('Error persisting selected photos:', error);
    }
  }, [selectedPhotos, isHydrated]);

  const toggleSelectionMode = useCallback(() => {
    setSelectionMode(prevMode => {
      const newMode = !prevMode;
      if (!newMode) {
        // Clear selection when exiting selection mode
        setSelectedPhotos([]);
        // Clear sessionStorage
        try {
          sessionStorage.removeItem(SELECTION_MODE_KEY);
          sessionStorage.removeItem(SELECTED_PHOTOS_KEY);
        } catch (error) {
          console.error('Error clearing selection from sessionStorage:', error);
        }
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

    // Clear sessionStorage
    try {
      sessionStorage.removeItem(SELECTION_MODE_KEY);
      sessionStorage.removeItem(SELECTED_PHOTOS_KEY);
    } catch (error) {
      console.error('Error clearing selection from sessionStorage:', error);
    }
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
        // Clear sessionStorage after successful confirmation
        try {
          sessionStorage.removeItem(SELECTION_MODE_KEY);
          sessionStorage.removeItem(SELECTED_PHOTOS_KEY);
        } catch (error) {
          console.error('Error clearing selection from sessionStorage:', error);
        }
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