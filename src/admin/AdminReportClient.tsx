'use client';

import { LockedPhotoWithUser } from '@/photo/db/query';
import DownloadReportButton from './components/DownloadReportButton';
import { clearAllSelectionsAction, cleanAllUsersAction } from './actions';
import { useState } from 'react';

export default function AdminReportClient({ photos }: { photos: LockedPhotoWithUser[] }) {
  const [isCleaningUsers, setIsCleaningUsers] = useState(false);

  const handleCleanUsers = async () => {
    if (!confirm('⚠️ This will delete ALL Google users and their sessions. The admin user will be preserved. Are you sure?')) {
      return;
    }

    setIsCleaningUsers(true);
    const result = await cleanAllUsersAction();
    setIsCleaningUsers(false);

    if (result.success) {
      alert('✅ All users cleaned successfully! You can now have users sign in again.');
      window.location.reload();
    } else {
      alert('❌ Error cleaning users: ' + result.error);
    }
  };

  // Group photos by user ID
  const photosByUser = photos.reduce((acc, photo) => {
    const userId = photo.lockedBy;
    if (userId) {
      if (!acc[userId]) {
        acc[userId] = {
          userName: photo.userName,
          userEmail: photo.userEmail,
          lockedBy: photo.lockedBy,
          photos: [],
        };
      }
      acc[userId].photos.push(photo);
    }
    return acc;
  }, {} as Record<string, { userName?: string, userEmail?: string, lockedBy: string, photos: LockedPhotoWithUser[] }>);

  const userCount = Object.keys(photosByUser).length;
  const totalPhotos = photos.length;

  return (
    <div>
      <div className="flex items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Selections Report</h1>
        <div className="text-sm text-gray-600">
          {userCount} user{userCount !== 1 ? 's' : ''} · {totalPhotos} photo{totalPhotos !== 1 ? 's' : ''}
        </div>
        <div className="ml-auto flex gap-2">
          <DownloadReportButton photosByOwner={photosByUser} />
          <button
            onClick={() => clearAllSelectionsAction()}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Clear All Selections
          </button>
          <button
            onClick={handleCleanUsers}
            disabled={isCleaningUsers}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:opacity-50"
          >
            {isCleaningUsers ? 'Cleaning...' : 'Clean All Users'}
          </button>
        </div>
      </div>
      {Object.entries(photosByUser).map(([userId, { userName, userEmail, photos: userPhotos }]) => {
        // Handle unknown users more gracefully
        const hasUserInfo = userName || userEmail;
        const displayUserName = userName || (userEmail ? userEmail.split('@')[0] : 'Unknown User');
        const displayId = userId.length > 20 ? `${userId.substring(0, 8)}...${userId.substring(userId.length - 8)}` : userId;

        return (
          <div key={userId} className="my-8 border-b pb-6">
            <h2 className="text-xl font-bold mb-2">
              {displayUserName}
              {userEmail && <span className="text-gray-600 font-normal ml-2">({userEmail})</span>}
              {!hasUserInfo && (
                <span className="text-gray-500 font-normal text-sm ml-2">
                  (ID: {displayId})
                </span>
              )}
            </h2>
            <div className="text-sm text-gray-500 mb-4">
              {userPhotos.length} photo{userPhotos.length !== 1 ? 's' : ''} selected
            </div>
            <ul className="list-disc pl-5 space-y-1">
              {userPhotos.map(photo => (
                <li key={photo.id} className="text-sm">
                  <span className="font-mono text-gray-600">{photo.id}</span>
                  {photo.title && <span className="ml-2">- {photo.title}</span>}
                  {photo.lockedAt && (
                    <span className="ml-2 text-xs text-gray-400">
                      (locked {photo.lockedAt.toLocaleString()})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      {photos.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No selections yet
        </div>
      )}
    </div>
  );
}