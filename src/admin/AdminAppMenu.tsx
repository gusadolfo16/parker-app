import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { Menu } from '@headlessui/react';
import { clsx } from 'clsx/lite';
import Link from 'next/link';
import {
  PATH_ADMIN_CONFIGURATION,
  PATH_ADMIN_INSIGHTS,
  PATH_ADMIN_PHOTOS,
  PATH_ADMIN_RECIPES,
  PATH_ADMIN_TAGS,
  PATH_ADMIN_UPLOADS,
} from '@/app/path';
import { useAppState } from '@/app/AppState';
import { useSelection } from '@/selection/SelectionContext';
import { useAppText } from '@/i18n/state/client';

export default function AdminAppMenu() {
  const pathname = usePathname();

  const {
    isUserAdmin,
  } = useAppState();

  const {
    selectionMode: isSelecting,
    toggleSelectionMode,
  } = useSelection();

  const appText = useAppText();

  const menuItems = [
    {
      label: appText.admin.managePhotos,
      href: PATH_ADMIN_PHOTOS,
      active: pathname.startsWith(PATH_ADMIN_PHOTOS),
    },
    {
      label: appText.admin.uploadPlural,
      href: PATH_ADMIN_UPLOADS,
      active: pathname.startsWith(PATH_ADMIN_UPLOADS),
    },
    {
      label: appText.admin.manageTags,
      href: PATH_ADMIN_TAGS,
      active: pathname.startsWith(PATH_ADMIN_TAGS),
    },
    
    {
      label: appText.admin.appConfig,
      href: PATH_ADMIN_CONFIGURATION,
      active: pathname.startsWith(PATH_ADMIN_CONFIGURATION),
    },
    {
      label: appText.admin.appInsights,
      href: PATH_ADMIN_INSIGHTS,
      active: pathname.startsWith(PATH_ADMIN_INSIGHTS),
    },
  ];

  return (
    <Menu as={Fragment}>
      <Menu.Button
        className={clsx(
          'active:opacity-75',
          'rounded-full',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          'transition-all ease-in-out',
          'w-8 h-8',
          'flex items-center justify-center',
          'text-gray-500 dark:text-gray-400',
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M2 8a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 8ZM2 3.25A.75.75 0 0 1 2.75 2h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.25ZM2.75 14h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 14a.75.75 0 0 1 .75-.75Z"
            clipRule="evenodd"
          />
        </svg>
      </Menu.Button>
      <Menu.Items
              className={clsx(
                        'absolute top-full right-0 z-[9999]',
                        'mt-2 origin-top-right',                'rounded-md shadow-lg',
                'bg-white dark:bg-gray-900',
                'ring-1 ring-black ring-opacity-5',
                'focus:outline-none',
                'py-1',
                'w-48',
              )}
            >
                {menuItems.map(item => (
                  <Menu.Item key={item.href}>
                    {({ active }) => (
                      <Link
                        href={item.href}
                        className={clsx(
                          'block px-4 py-2 text-sm',
                          active
                            ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                            : 'text-gray-700 dark:text-gray-300',
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={toggleSelectionMode}
                      className={clsx(
                        'block px-4 py-2 text-sm w-full text-left',
                        active
                          ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                          : 'text-gray-700 dark:text-gray-300',
                      )}
                    >
                      {isSelecting
                        ? appText.admin.batchExitEdit
                        : appText.admin.batchEdit}
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>    </Menu>
  );
}
