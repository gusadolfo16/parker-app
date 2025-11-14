import { Photo, titleForPhoto } from '@/photo';
import { useAppText } from '@/i18n/state/client';
import { useAppState } from '@/app/AppState';
import { PATH_ADMIN_PHOTOS, pathForAdminPhotoEdit } from '@/app/path';
import { useRouter } from 'next/navigation';
import { toastSuccess } from '@/toast';
import { deletePhotoAction, toggleFavoritePhotoAction, togglePrivatePhotoAction, syncPhotoAction } from '@/photo/actions';
import { clsx } from 'clsx/lite';
import { isPhotoFav } from '@/tag';
import { FaRegStarIcon, FaStarIcon } from '@/components/icons/FaStarIcon';
import { IoMdEyeIcon, IoMdEyeOffIcon } from '@/components/icons/IoMdEyeIcon';
import { MdOutlineModeEditIcon, MdOutlineDeleteIcon } from '@/components/icons/MdOutlineEditIcon';
import { RiExternalLinkLineIcon } from '@/components/icons/RiExternalLinkLineIcon';
import FaRegClockIcon from '@/components/icons/FaRegClockIcon';
import MdOutlineFileDownloadIcon from '@/components/icons/MdOutlineFileDownloadIcon';
import MoreMenu, { MoreMenuSection } from '@/components/more/MoreMenu';
import MoreMenuItem from '@/components/more/MoreMenuItem';

export default function AdminPhotoMenu({
  photo,
  className,
}: {
  photo: Photo,
  className?: string,
}) {
  const { id, title, hidden } = photo;

  const router = useRouter();

  const { 
    isUserAdmin,
    isUserSignedIn,
    adminUpdateTimes,
  } = useAppState();

  const appText = useAppText();

  const photoHasUpdate = adminUpdateTimes?.some(date => date > photo.updatedAt);

  const isFav = isPhotoFav(photo);

  const sections: MoreMenuSection[] = [
    {
      items: [
        {
          label: appText.admin.edit,
          icon: <MdOutlineModeEditIcon size={17} />,
          href: pathForAdminPhotoEdit(photo),
        },
        {
          label: isFav ? appText.admin.unfavorite : appText.admin.favorite,
          icon: isFav ? <FaStarIcon size={16} /> : <FaRegStarIcon size={16} />,
          action: async () => {
            await toggleFavoritePhotoAction(id, !isFav);
            toastSuccess(
              isFav
                ? `Unfavorited ${title}`
                : `Favorited ${title}`
            );
          },
        },
        {
          label: hidden ? appText.admin.public : appText.admin.private,
          icon: hidden ? <IoMdEyeIcon size={18} /> : <IoMdEyeOffIcon size={18} />,
          action: async () => {
            await togglePrivatePhotoAction(id);
            toastSuccess(
              hidden
                ? `Made ${title} public`
                : `Made ${title} private`
            );
          },
        },
        {
          label: appText.admin.download,
          icon: <MdOutlineFileDownloadIcon
            size={17}
            className="translate-x-[-1px]"
          />,
          href: photo.url,
          target: '_blank',
        },
        {
          label: appText.admin.sync,
          icon: <FaRegClockIcon size={16} />,
          action: async () => {
            await syncPhotoAction(id);
            toastSuccess(appText.admin.sync);
          },
        },
        {
          label: appText.admin.delete,
          icon: <MdOutlineDeleteIcon size={18} />,
          action: async () => {
            if (confirm(appText.admin.deleteConfirm(titleForPhoto(photo)))) {
              await deletePhotoAction(id, photo.url);
              router.push(PATH_ADMIN_PHOTOS);
              toastSuccess(`Deleted ${title}`);
            }
          },
        },
      ],
    },
  ];

  return (
    <MoreMenu
      className={className}
      ariaLabel={appText.admin.edit}
      icon={
        <div className={clsx(
          'w-full h-full rounded-full',
          'flex items-center justify-center',
          'group-hover:bg-gray-100 group-hover:dark:bg-gray-800',
          'transition-all duration-200 ease-in-out',
          photoHasUpdate && 'text-main animate-pulse-slow',
        )}>
          <MdOutlineModeEditIcon size={18} />
        </div>
      }
      sections={sections}
    />
  );
}
