'use client';

import { clsx } from 'clsx/lite';
import { PhotoSetCategories } from '@/category';
import PhotoRecents from '@/recents/PhotoRecents';
import PhotoYear from '@/years/PhotoYear';
import PhotoCamera from '@/camera/PhotoCamera';
import PhotoLens from '@/lens/PhotoLens';
import PhotoTag from '@/tag/PhotoTag';
import PhotoRecipe from '@/recipe/PhotoRecipe';
import PhotoFilm from '@/film/PhotoFilm';
import PhotoFocalLength from '@/focal/PhotoFocalLength';
import PhotoFavs from '@/tag/PhotoFavs';
import PhotoPrivate from '@/tag/PhotoPrivate';
import { TAG_FAVS, TAG_PRIVATE, addPrivateToTags, limitTagsByCount } from '@/tag';
import { HIDE_TAGS_WITH_ONE_PHOTO, SHOW_CATEGORY_IMAGE_HOVERS } from '@/app/config';
import { useMemo } from 'react';
import { useAppState } from '@/app/AppState';

export default function PhotoGridMobileFilters({
    ..._categories
}: PhotoSetCategories) {
    const categories = useMemo(() => HIDE_TAGS_WITH_ONE_PHOTO
        ? {
            ..._categories,
            tags: limitTagsByCount(_categories.tags, 2),
        }
        : _categories
        , [_categories]);

    const {
        recents,
        years,
        cameras,
        lenses,
        tags,
        films,
        recipes,
        focalLengths,
    } = categories;

    const { photosCountHidden } = useAppState();

    const tagsIncludingHidden = useMemo(() =>
        addPrivateToTags(tags, photosCountHidden)
        , [tags, photosCountHidden]);

    return (
        <div className={clsx(
            'flex overflow-x-auto gap-2 pb-3',
            // Hide scrollbar
            '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
        )}>
            {/* Recents */}
            {recents.length > 0 && recents[0] && (
                <PhotoRecents
                    key="recents"
                    countOnHover={recents[0].count}
                    type="text-only"
                    prefetch={false}
                    contrast="high"
                    badged
                    showHover={false}
                />
            )}

            {/* Years */}
            {years.slice(0, 5).map(({ year, count }) => (
                <PhotoYear
                    key={year}
                    year={year}
                    countOnHover={count}
                    type="text-only"
                    prefetch={false}
                    contrast="high"
                    suppressSpinner
                    badged
                    showHover={false}
                />
            ))}

            {/* Cameras */}
            {cameras.slice(0, 5).map(({ cameraKey, camera, count }) => (
                <PhotoCamera
                    key={cameraKey}
                    camera={camera}
                    type="text-only"
                    countOnHover={count}
                    prefetch={false}
                    contrast="high"
                    badged
                    showHover={false}
                />
            ))}

            {/* Lenses */}
            {lenses.slice(0, 5).map(({ lensKey, lens, count }) => (
                <PhotoLens
                    key={lensKey}
                    lens={lens}
                    type="text-only"
                    countOnHover={count}
                    prefetch={false}
                    contrast="high"
                    badged
                    showHover={false}
                />
            ))}

            {/* Tags */}
            {tagsIncludingHidden.slice(0, 10).map(({ tag, count }) => {
                switch (tag) {
                    case TAG_FAVS:
                        return (
                            <PhotoFavs
                                key={TAG_FAVS}
                                countOnHover={count}
                                type="icon-last"
                                prefetch={false}
                                contrast="high"
                                badged
                                showHover={false}
                            />
                        );
                    case TAG_PRIVATE:
                        return (
                            <PhotoPrivate
                                key={TAG_PRIVATE}
                                countOnHover={count}
                                type="icon-last"
                                prefetch={false}
                                contrast="high"
                                badged
                                showHover={false}
                            />
                        );
                    default:
                        return (
                            <PhotoTag
                                key={tag}
                                tag={tag}
                                type="text-only"
                                countOnHover={count}
                                prefetch={false}
                                contrast="high"
                                badged
                                showHover={false}
                            />
                        );
                }
            })}

            {/* Recipes */}
            {recipes.slice(0, 5).map(({ recipe, count }) => (
                <PhotoRecipe
                    key={recipe}
                    recipe={recipe}
                    type="text-only"
                    countOnHover={count}
                    prefetch={false}
                    contrast="high"
                    badged
                    showHover={false}
                />
            ))}

            {/* Films */}
            {films.slice(0, 5).map(({ film, count }) => (
                <PhotoFilm
                    key={film}
                    film={film}
                    countOnHover={count}
                    type="text-only"
                    prefetch={false}
                    contrast="high"
                    badged
                    showHover={false}
                />
            ))}

            {/* Focal Lengths */}
            {focalLengths.slice(0, 5).map(({ focal, count }) => (
                <PhotoFocalLength
                    key={focal}
                    focal={focal}
                    countOnHover={count}
                    type="text-only"
                    prefetch={false}
                    contrast="high"
                    badged
                    showHover={false}
                />
            ))}
        </div>
    );
}
