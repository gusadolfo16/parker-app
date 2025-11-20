'use client';

import { PhotoSetCategories } from '@/category';
import Link from 'next/link';
import {
  pathForCamera,
  pathForFilm,
  pathForFocalLength,
  pathForLens,
  pathForTag,
  pathForYear,
} from '@/app/path';
import { useAppText } from '@/i18n/state/client';
import { capitalize } from '@/utility/string';
import { clsx } from 'clsx/lite';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import CategoryHeader from '@/category/CategoryHeader';
import IconTag from '@/components/icons/IconTag';
import IconCamera from '@/components/icons/IconCamera';
import { FiFilm, FiAperture, FiCalendar } from 'react-icons/fi';

export default function PhotoSidebar({
  cameras,
  lenses,
  tags,
  films,
  focalLengths,
  years,
}: PhotoSetCategories) {
  const appText = useAppText();
  const pathname = usePathname();

  const renderCategoryLinks = (
    title: string,
    icon: ReactNode,
    items: { path: string; label: string; count: number }[],
  ) => (
    items.length > 0 && ( // Only render if there are items
      <div className="mb-6">
        <CategoryHeader title={title} icon={icon} />
        <ul className="space-y-1">
          {items.map(({ path, label, count }) => (
            <li key={path}>
              <Link
                href={path}
                className={clsx(
                  'block text-gray-700 dark:text-gray-300 hover:text-main',
                  pathname === path && 'font-bold',
                )}
              >
                {label} ({count})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  );

  const cameraLinks = cameras.map(camera => ({
    path: pathForCamera(camera.camera),
    label: `${camera.camera.make} ${camera.camera.model}`,
    count: camera.count,
  }));

  const lensLinks = lenses.map(lens => ({
    path: pathForLens(lens.lens),
    label: `${lens.lens.make ? `${lens.lens.make} ` : ''}${lens.lens.model}`,
    count: lens.count,
  }));

  const tagLinks = tags.map(tag => ({
    path: pathForTag(tag.tag),
    label: capitalize(tag.tag),
    count: tag.count,
  }));

  const filmLinks = films.map(film => ({
    path: pathForFilm(film.film),
    label: capitalize(film.film),
    count: film.count,
  }));

  const focalLengthLinks = focalLengths.map(focal => ({
    path: pathForFocalLength(focal.focal),
    label: `${focal.focal}mm`,
    count: focal.count,
  }));

  const yearLinks = years.map(year => ({
    path: pathForYear(year.year),
    label: `${year.year}`,
    count: year.count,
  }));

  return (
    <div className="p-4 space-y-6">
      {renderCategoryLinks(appText.category.tagPlural, <IconTag />, tagLinks)}
      {renderCategoryLinks(appText.category.cameraPlural, <IconCamera />, cameraLinks)}
      {renderCategoryLinks(appText.category.lensPlural, <IconCamera />, lensLinks)}
      {renderCategoryLinks(appText.category.filmPlural, <FiFilm />, filmLinks)}
      {renderCategoryLinks(appText.category.focalLengthPlural, <FiAperture />, focalLengthLinks)}
      {renderCategoryLinks(appText.category.yearPlural, <FiCalendar />, yearLinks)}
    </div>
  );
}
