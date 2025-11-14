import clsx from 'clsx/lite';
import { ReactNode, RefObject, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import useImageZoomControls from './useImageZoomControls';
import { RiCollapseDiagonalLine, RiExpandDiagonalLine } from 'react-icons/ri';

export type ZoomControlsRef = {
  open: () => void
  zoomTo: (zoomLevel?: number) => void
}

const ZoomControls = forwardRef<ZoomControlsRef, {
  children: ReactNode
  selectImageElement?: (container: HTMLElement | null) =>
    HTMLImageElement | null
  isEnabled?: boolean
}>(({ children, ...props }, ref) => {
  const refImageContainer = useRef<HTMLDivElement>(null);

  const {
    open,
    reset,
    zoomTo,
    zoomLevel,
    refViewerContainer,
  } = useImageZoomControls({
    refImageContainer,
    ...props,
  });

  useImperativeHandle(ref, () => ({
    open,
    zoomTo,
  }), [open, zoomTo]);

  const shouldZoomTo2x = zoomLevel !== 2;

  const button = 
    <button
      type="button"
      className={clsx(
        'fixed top-[20px] right-[70px]',
        'size-10 items-center justify-center',
        'rounded-full border-none',
        'text-white bg-black/50 hover:bg-black/85',
      )}
      onClick={() => shouldZoomTo2x ? zoomTo(2) : reset()}
    >
      {shouldZoomTo2x
        ? <RiCollapseDiagonalLine className="shrink-0" size={20} />
        : <RiExpandDiagonalLine className="shrink-0" size={20} />}
    </button>;

  return (
    <div
      ref={refImageContainer}
      className={clsx('h-full', props.isEnabled && 'cursor-zoom-in')}
    >
      {children}
      {refViewerContainer.current
        ? createPortal(button, refViewerContainer.current)
        : null}
    </div>
  );
});

export default ZoomControls;
