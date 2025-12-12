'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useSelection } from '@/selection/SelectionContext';
import { useSession } from 'next-auth/react';
import { isPathSelected, PATH_SELECTED } from '@/app/path';
import { toast } from 'sonner';
import Switcher from '@/components/switcher/Switcher';
import SwitcherItem from '@/components/switcher/SwitcherItem';

export default function MobileSelectionBar() {
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
                                icon={<span>Confirm</span>}
                                onClick={async () => {
                                    const success = await confirmSelection();
                                    if (success) {
                                        router.refresh();
                                        router.push(PATH_SELECTED);
                                    }
                                }}
                                tooltip={{
                                    content: 'Confirm Selection',
                                }}
                            />
                            <SwitcherItem
                                className="px-3"
                                width="auto"
                                noPadding
                                icon={<span>Cancel</span>}
                                onClick={() => {
                                    clearSelection();
                                    router.refresh();
                                }}
                                tooltip={{
                                    content: 'Cancel Selection',
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
                                    icon={<span>Select</span>}
                                    onClick={() => toggleSelectionMode()}
                                    tooltip={{
                                        content: 'Select Photos',
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
                                            Selected ({selectedPhotos.length})
                                        </span>
                                    }
                                    onClick={() => {
                                        toast.info(
                                            'Redirecting to selected photos...',
                                        );
                                        router.push(PATH_SELECTED);
                                    }}
                                    tooltip={{
                                        content: 'View Selections',
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
