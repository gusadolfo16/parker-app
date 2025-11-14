'use client';

import { ReactNode, useEffect, useRef, useTransition } from 'react';

const DEFAULT_FLICKER_THRESHOLD = 400;

export default function LinkWithStatusChild({
  children,
  setIsLoading,
  onLoad,
  flickerThreshold = DEFAULT_FLICKER_THRESHOLD,
}: {
  children: ReactNode
  setIsLoading: (isLoading: boolean) => void
  onLoad?: () => void
  flickerThreshold?: number
}) {
  const [isPending, startTransition] = useTransition();

  const startLoadingTimeout = useRef<NodeJS.Timeout | null>(null);
  const stopLoadingTimeout = useRef<NodeJS.Timeout | null>(null);
  
  const isLoadingStartTime = useRef<number | null>(null);

  useEffect(() => {
    if (isPending) {
      if (stopLoadingTimeout.current) {
        clearTimeout(stopLoadingTimeout.current);
      }
      stopLoadingTimeout.current = null;
      startLoadingTimeout.current = setTimeout(() => {
        setIsLoading(true);
        isLoadingStartTime.current = Date.now();
      }, flickerThreshold);
    } else if (startLoadingTimeout.current) {
      if (startLoadingTimeout.current) {
        clearTimeout(startLoadingTimeout.current);
      }
      startLoadingTimeout.current = null;
      const loadingDuration = Date.now() - (isLoadingStartTime.current ?? 0);
      stopLoadingTimeout.current = setTimeout(() => {
        setIsLoading(false);
        isLoadingStartTime.current = null;
      }, Math.max(0, flickerThreshold - loadingDuration));
    }
  }, [isPending, setIsLoading, flickerThreshold]);

  useEffect(() => {
    return () => {
      if (startLoadingTimeout.current) {
        clearTimeout(startLoadingTimeout.current);
      }
      if (stopLoadingTimeout.current) {
        clearTimeout(stopLoadingTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isPending && startLoadingTimeout.current) {
      onLoad?.();
    }
    return () => {
      if (isPending && startLoadingTimeout.current) {
        onLoad?.();
      }
    };
  }, [isPending, onLoad]);

  return <>{children}</>;
}
