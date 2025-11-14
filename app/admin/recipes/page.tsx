import AdminRecipeTable from '@/admin/AdminRecipeTable';
import AppGrid from '@/components/AppGrid';
import { getUniqueRecipes } from '@/photo/db/query';

export default async function AdminRecipesPage() {
  const recipes = await getUniqueRecipes().catch(() => []);
  const recipeTable = await AdminRecipeTable({ recipes });

  return (
    <AppGrid
      contentMain={
        <div className="space-y-6">
          <div className="space-y-4">
            {recipeTable}
          </div>
        </div>}
    />
  );
}
