'use client';

import { LockedPhotoWithUser } from '@/photo/db/query';
import { Photo, altTextForPhoto } from '@/photo';
import Image from 'next/image';

import { clearAllSelectionsAction } from './actions';

export default function AdminReportClient({ photos }: { photos: LockedPhotoWithUser[] }) {
  const photosByUser = photos.reduce((acc, photo) => {
    const userId = photo.lockedBy;
    if (userId) {
      if (!acc[userId]) {
        acc[userId] = {
          userName: photo.userName,
          userEmail: photo.userEmail,
          photos: [],
        };
      }
      acc[userId].photos.push(photo);
    }
    return acc;
  }, {} as Record<string, { userName?: string, userEmail?: string, photos: Photo[] }>);

  return (
    <div>
      <div className="flex items-center mb-4">
        <h1 className="text-2xl font-bold">Selections Report</h1>
        <button
          onClick={() => clearAllSelectionsAction()}
          className="ml-auto bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Clear All Selections
        </button>
      </div>
      {Object.entries(photosByUser).map(([userId, { userName, userEmail, photos }]) => (
        <div key={userId} className="my-8">
          <h2 className="text-xl font-bold">User: {userName} ({userEmail})</h2>
          {/* DEBUG: Render a simple list instead of images */}
          <ul className="list-disc pl-5 mt-4">
            {photos.map(photo => (
              <li key={photo.id}>
                {photo.id} - {photo.title || 'No Title'}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
