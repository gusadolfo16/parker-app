'use client';

import { clsx } from 'clsx/lite';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import AppGrid from '@/components/AppGrid';
import AppViewSwitcher, { SwitcherSelection } from '@/app/AppViewSwitcher';
import {
  PATH_ROOT,
  isPathAdmin,
  isPathFull,
  isPathGrid,
  isPathProtected,
  isPathSignIn,
  isPathSelected,
  PATH_SELECTED,
} from '@/app/path';
import AnimateItems from '../components/AnimateItems';
import {
  GRID_HOMEPAGE_ENABLED,
  NAV_CAPTION,
} from './config';
import { useRef } from 'react';
import useStickyNav from './useStickyNav';
import { useAppState } from '@/app/AppState';
import Switcher from '@/components/switcher/Switcher';
import SwitcherItem from '@/components/switcher/SwitcherItem';
import { useSelection } from '@/selection/SelectionContext';
import { useSession } from 'next-auth/react';
import AdminAppMenu from '@/admin/AdminAppMenu';


const NAV_HEIGHT_CLASS = NAV_CAPTION
  ? 'min-h-[4rem] sm:min-h-[5rem]'
  : 'min-h-[4rem]';

export default function NavClient({
  navTitle,
  navCaption,
  animate,
}: {
  navTitle: string
  navCaption?: string
  animate: boolean
}) {
  const ref = useRef<HTMLElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const showNav = !isPathSignIn(pathname);

  const { data: session, status } = useSession();
  const {
    hasLoadedWithAnimations,
    isUserSignedIn,
    isUserAdmin,
    isCheckingAuth,
  } = useAppState();

  const {
    selectionMode,
    toggleSelectionMode,
    selectedPhotos,
    confirmSelection,
    clearSelection,
  } = useSelection();

  const {
    classNameStickyContainer,
    classNameStickyNav,
    isNavVisible,
  } = useStickyNav(ref, !isPathAdmin(pathname));

  const renderLink = (
    text: string,
    linkOrAction: string | (() => void),
  ) =>
    typeof linkOrAction === 'string'
      ? <Link href={linkOrAction}>{text}</Link>
      : <button onClick={linkOrAction} type="button">{text}</button>;

  const switcherSelectionForPath = (): SwitcherSelection | undefined => {
    if (pathname === PATH_ROOT) {
      return GRID_HOMEPAGE_ENABLED ? 'grid' : 'full';
    } else if (isPathGrid(pathname)) {
      return 'grid';
    } else if (isPathFull(pathname)) {
      return 'full';
    } else if (isPathProtected(pathname)) {
      return 'admin';
    }
  };

  return (
    <AppGrid
      className={classNameStickyContainer}
      classNameMain='pointer-events-auto'
      contentMain={
        <AnimateItems
          animateOnFirstLoadOnly
          type={animate && !isPathAdmin(pathname) ? 'bottom' : 'none'}
          distanceOffset={10}
          items={showNav
            ? [<nav
              key="nav"
              ref={ref}
              className={clsx(
                'w-full flex items-center bg-main z-10',
                NAV_HEIGHT_CLASS,
                classNameStickyNav,
              )}>
              <div className="flex items-center gap-0.5 sm:gap-1">
                <AppViewSwitcher
                  currentSelection={switcherSelectionForPath()}
                  animate={hasLoadedWithAnimations && isNavVisible}
                />
                {isUserAdmin &&
                  <div className="relative">
                    <AdminAppMenu />
                  </div>
                }
                {/* Selection Buttons */}
                {status !== 'loading' && selectionMode && status === 'authenticated' ? (
                  <div className="flex items-center">
                    <Switcher type="borderless">
                      <SwitcherItem
                        className="px-3"
                        width="auto"
                        noPadding
                        icon={<span>Confirm</span>}
                        onClick={async () => {
                          const success = await confirmSelection();
                          if (success) {
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
                    <span className="text-dim ml-1 whitespace-nowrap">({selectedPhotos.length})</span>
                  </div>
                ) : (
                  status !== 'loading' && status === 'authenticated' && !isPathSelected(pathname) && (
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
                  )
                )}
                {/* View Selections Button - only visible when not in selectionMode and photos are selected */}
                {!selectionMode && selectedPhotos.length > 0 && status === 'authenticated' && (
                  <Switcher type="borderless">
                    <SwitcherItem
                      icon={<span className="whitespace-nowrap">View ({selectedPhotos.length})</span>}
                      href={PATH_SELECTED}
                      tooltip={{
                        content: 'View Selections',
                      }}
                      width="narrow"
                    />
                  </Switcher>
                )}
              </div>
              <div className={clsx(
                'grow text-right min-w-0',
                'translate-y-[-1px]',
                'ml-4 sm:ml-6',
              )}>
                <div className="truncate overflow-hidden select-none">
                  {renderLink(navTitle, PATH_ROOT)}
                </div>
                {navCaption &&
                  <div className={clsx(
                    'hidden sm:block truncate overflow-hidden',
                    'leading-tight text-dim',
                  )}>
                    {navCaption}
                  </div>}
              </div>
              {/* Sign-in Button */}
              {!isUserSignedIn && (
                <div className="ml-3 sm:ml-4">
                  <Link
                    href="/sign-in"
                    className={clsx(
                      'font-mono link h-4 active:text-medium',
                      'disabled:bg-transparent! hover:text-dim',
                      'inline-flex items-center gap-1.5 self-start',
                      'whitespace-nowrap focus:outline-hidden text-medium',
                    )}
                  >
                    <span className="hidden sm:inline">Sign In</span>
                    <span className="sm:hidden">-</span>
                  </Link>
                </div>
              )}
              {/* Admin Button */}
              {isUserAdmin && (
                <div className="ml-3 sm:ml-4">
                  <Link
                    href="/admin/photos"
                    className={clsx(
                      'font-mono link h-4 active:text-medium',
                      'disabled:bg-transparent! hover:text-dim',
                      'inline-flex items-center gap-1.5 self-start',
                      'whitespace-nowrap focus:outline-hidden text-medium',
                    )}
                  >
                    <span className="hidden sm:inline">Admin</span>
                    <span className="sm:hidden">A</span>
                  </Link>
                </div>
              )}
            </nav>]
            : []}
        />
      }
    />
  );
}