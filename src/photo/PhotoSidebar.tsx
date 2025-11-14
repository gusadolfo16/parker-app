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
    items: { path: string; label: string; count: number }[],
  ) => (
    items.length > 0 && ( // Only render if there are items
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
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
      {renderCategoryLinks(appText.category.tagPlural, tagLinks)}
      {renderCategoryLinks(appText.category.cameraPlural, cameraLinks)}
      {renderCategoryLinks(appText.category.lensPlural, lensLinks)}
      {renderCategoryLinks(appText.category.filmPlural, filmLinks)}
      {renderCategoryLinks(appText.category.focalLengthPlural, focalLengthLinks)}
      {renderCategoryLinks(appText.category.yearPlural, yearLinks)}
    </div>
  );
}
