'use client';

/* eslint-disable max-len */

import { usePathname, useRouter } from 'next/navigation';
import { useSelection } from '@/selection/SelectionContext';
import { useSession } from 'next-auth/react';
import { isPathSelected, PATH_SELECTED } from '@/app/path';
import { toast } from 'sonner';
import Switcher from '@/components/switcher/Switcher';
import SwitcherItem from '@/components/switcher/SwitcherItem';
import { useAppText } from '@/i18n/state/client';

export default function MobileSelectionBar() {
  const appText = useAppText();
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  const {
    selectionMode,
    toggleSelectionMode,
    selectedPhotos,
    confirmSelection,
    clearSelection,
  } = useSelection();

  if (status === 'loading' || status !== 'authenticated') {
    return null;
  }

  return (
    <div className="sm:hidden w-full bg-main">
      <div
        className={
          'flex items-center justify-center gap-2 py-2 px-4'
        }
      >
        {selectionMode ? (
          <>
            <Switcher type="borderless">
              <SwitcherItem
                className="px-3"
                width="auto"
                noPadding
                icon={<span>{appText.selected.confirm}</span>}
                onClick={async () => {
                  const success = await confirmSelection();
                  if (success) {
                    router.refresh();
                    router.push(PATH_SELECTED);
                  }
                }}
                tooltip={{
                  content: appText.selected.confirmTooltip,
                }}
              />
              <SwitcherItem
                className="px-3"
                width="auto"
                noPadding
                icon={<span>{appText.selected.cancel}</span>}
                onClick={() => {
                  clearSelection();
                  router.refresh();
                }}
                tooltip={{
                  content: appText.selected.cancelTooltip,
                }}
              />
            </Switcher>
            <span className="text-dim text-sm ml-1">
              ({selectedPhotos.length})
            </span>
          </>
        ) : (
          <>
            {!isPathSelected(pathname) && (
              <Switcher type="borderless">
                <SwitcherItem
                  className="px-3"
                  width="auto"
                  noPadding
                  icon={<span>{appText.selected.select}</span>}
                  onClick={() => toggleSelectionMode()}
                  tooltip={{
                    content: appText.selected.selectTooltip,
                  }}
                />
              </Switcher>
            )}
            {selectedPhotos.length > 0 && (
              <Switcher type="borderless">
                <SwitcherItem
                  className="px-3"
                  width="auto"
                  noPadding
                  icon={
                    <span>
                      {appText.selected.selectedItem} ({selectedPhotos.length})
                    </span>
                  }
                  onClick={() => {
                    toast.info(appText.selected.redirecting);
                    router.push(PATH_SELECTED);
                  }}
                  tooltip={{
                    content: appText.selected.viewSelections,
                  }}
                />
              </Switcher>
            )}
          </>
        )}
      </div>
    </div>
  );
}
