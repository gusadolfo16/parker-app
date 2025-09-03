'use client';

import { clsx } from 'clsx/lite';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import AppGrid from '../components/AppGrid';
import AppViewSwitcher, { SwitcherSelection } from '@/app/AppViewSwitcher';
import {
  PATH_ROOT,
  isPathAdmin,
  isPathFull,
  isPathGrid,
  isPathProtected,
  isPathSignIn,
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
  const showNav = !isPathSignIn(pathname);

  const {
    hasLoadedWithAnimations,
    isUserSignedIn,
    isUserAdmin,
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
                'w-full flex items-center bg-main',
                NAV_HEIGHT_CLASS,
                classNameStickyNav,
              )}>
              <AppViewSwitcher
                currentSelection={switcherSelectionForPath()}
                className="translate-x-[-1px]"
                animate={hasLoadedWithAnimations && isNavVisible}
              />
              {/* Selection Buttons */}
              {selectionMode ? (
                <Switcher type="borderless" className="mr-2">
                  <SwitcherItem
                    icon={<span>Confirm ({selectedPhotos.length})</span>}
                    onClick={() => confirmSelection()}
                    tooltip={{
                      content: 'Confirm Selection',
                    }}
                    width="narrow"
                  />
                  <SwitcherItem
                    icon={<span>Cancel</span>}
                    onClick={() => clearSelection()}
                    tooltip={{
                      content: 'Cancel Selection',
                    }}
                    width="narrow"
                  />
                </Switcher>
              ) : (
                <div className="w-20">
                  <Switcher type="borderless" className="mr-2">
                    <SwitcherItem
                      icon={<span>Select</span>}
                      onClick={() => toggleSelectionMode()}
                      tooltip={{
                        content: 'Select Photos',
                      }}
                      width="narrow"
                    />
                  </Switcher>
                </div>
              )}
              {/* View Selections Button - only visible when not in selectionMode and photos are selected */}
              {!selectionMode && selectedPhotos.length > 0 && (
                <Switcher type="borderless" className="mr-2">
                  <SwitcherItem
                    icon={<span>View Selections ({selectedPhotos.length})</span>}
                    href="/selected"
                    tooltip={{
                      content: 'View Selections',
                    }}
                    width="narrow"
                  />
                </Switcher>
              )}
              <div className={clsx(
                'grow text-right min-w-0',
                'translate-y-[-1px]',
                'mr-4', // Added margin-right
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
                <div>
                  <Link
                    href="/sign-in"
                    className={clsx(
                      'font-mono link h-4 active:text-medium',
                      'disabled:bg-transparent! hover:text-dim',
                      'inline-flex items-center gap-1.5 self-start',
                      'whitespace-nowrap focus:outline-hidden text-medium',
                    )}
                  >
                    Sign In
                  </Link>
                </div>
              )}
              {/* Admin Button */}
              {isUserAdmin && (
                <div>
                  <Link
                    href="/admin/photos"
                    className={clsx(
                      'font-mono link h-4 active:text-medium',
                      'disabled:bg-transparent! hover:text-dim',
                      'inline-flex items-center gap-1.5 self-start',
                      'whitespace-nowrap focus:outline-hidden text-medium',
                    )}
                  >
                    Admin
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