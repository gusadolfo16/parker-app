'use client';

import { LockedPhotoWithUser } from '@/photo/db/query';
import { useCallback } from 'react';
import { toastSuccess } from '@/toast';

interface DownloadReportButtonProps {
  photosByOwner: Record<string, LockedPhotoWithUser[]>;
}

export default function DownloadReportButton({ photosByOwner }: DownloadReportButtonProps) {
  const handleDownload = useCallback(() => {
    let csvContent = "User Name,User Email,Photo ID,Photo Title,Photo URL,Locked At\n";

    Object.entries(photosByOwner).forEach(([ownerId, photos]) => {
      const firstPhoto = photos[0];
      const displayEmail = firstPhoto.userEmail || ownerId;
      const displayUserName = firstPhoto.userName || (displayEmail.includes('@') ? displayEmail.split('@')[0] : displayEmail);

      photos.forEach(photo => {
        csvContent += `"${displayUserName}","${displayEmail}","${photo.id}","${photo.title}","${photo.url}","${photo.lockedAt?.toLocaleString() ?? ''}"\n`;
      });
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) { // Feature detection for download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'selection_report.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toastSuccess('Report downloaded successfully!');
    } else {
      toastSuccess('Your browser does not support downloading files directly.');
    }
  }, [photosByOwner]);

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      Download CSV
    </button>
  );
}