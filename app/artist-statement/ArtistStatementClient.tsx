'use client';

import { useAppText } from '@/i18n/state/client';

export default function ArtistStatementClient() {
  const t = useAppText();
  const txt = t.artistStatementPage;

  return (
    <div className="space-y-6 max-w-2xl mx-auto py-4">
      <h1 className="text-3xl font-bold">{txt.title}</h1>

      <div className="space-y-4 text-lg leading-relaxed text-dim">
        <p>{txt.p1}</p>
        <p>{txt.p2}</p>
        <p>{txt.p3}</p>
      </div>

      <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
        <p className="font-medium text-dim">{txt.author}</p>
      </div>
    </div>
  );
}
