import LinkWithStatus from '@/components/LinkWithStatus';
import SignInForm from '@/auth/SignInForm';
import { PATH_ROOT } from '@/app/path';
import IoArrowBackIcon from '@/components/icons/IoArrowBackIcon';
import { getTextForLocale } from '@/i18n';
import { APP_LOCALE } from '@/app/config';

export default async function SignInPage() {
  const appText = await getTextForLocale(APP_LOCALE);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="absolute top-0 left-0 p-4">
        <LinkWithStatus
          href={PATH_ROOT}
          className="button"
          type="text"
          prefetch={false}
        >
          <IoArrowBackIcon className="translate-y-[1px]" />
          {appText.nav.home}
        </LinkWithStatus>
      </div>
      <SignInForm />
    </div>
  );
}
