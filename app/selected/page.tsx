import { getAppText } from '@/i18n/state/server';
import SelectedPageClient from './SelectedPageClient';

export default async function SelectedPage() {
  const appText = await getAppText();

  return <SelectedPageClient appText={appText.onboarding} />;
}