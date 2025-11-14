import AdminChildPage from '@/components/AdminChildPage';
import { redirect } from 'next/navigation';
import { getPhotosCached, getPhotosMetaCached } from '@/photo/cache';
import { PATH_ADMIN, PATH_ADMIN_RECIPES, pathForRecipe } from '@/app/path';
import PhotoLightbox from '@/photo/PhotoLightbox';
import AdminRecipeBadge from '@/admin/AdminRecipeBadge';
import AdminRecipeForm from '@/admin/AdminRecipeForm';
import { getRecipePropsFromPhotos } from '@/recipe';
import AdminShowRecipeButton from '@/admin/AdminShowRecipeButton';

const MAX_PHOTO_TO_SHOW = 6;

interface Props {
  params: { recipe: string }
}

export default async function RecipePageEdit({
  params: { recipe: recipeFromParams },
}: Props) {
  const recipe = decodeURIComponent(recipeFromParams);
  
  const [
    { count },
    photos,
  ] = await Promise.all([
    getPhotosMetaCached({ recipe }),
    getPhotosCached({ recipe, limit: MAX_PHOTO_TO_SHOW }),
  ]);

  const { data, film } = getRecipePropsFromPhotos(photos) ?? {};

  if (count === 0) { redirect(PATH_ADMIN); }

  const breadcrumb = await AdminRecipeBadge({ recipe, count, hideBadge: true });

  return (
    <AdminChildPage
      backPath={PATH_ADMIN_RECIPES}
      backLabel="Recipes"
      breadcrumb={breadcrumb}
      accessory={data && film &&
        <AdminShowRecipeButton
          onClick={() => {}}
        />
      }
    >
      <AdminRecipeForm {...{ recipe, photos }}>
        <PhotoLightbox
          {...{ count, photos, recipe }}
          maxPhotosToShow={MAX_PHOTO_TO_SHOW}
          moreLink={pathForRecipe(recipe)}
        />
      </AdminRecipeForm>
    </AdminChildPage>
  );
};
