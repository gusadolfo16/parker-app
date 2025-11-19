import { ReactNode } from 'react';

export default function CategoryHeader({
  title,
  icon,
}: {
  title: string,
  icon: ReactNode,
}) {
  return (
    <div className="text-dim uppercase">
      <div className="text-gray-900 dark:text-gray-100 flex items-center mb-1 gap-1 uppercase select-none">
        <span className="text-icon w-[1rem]">
          {icon}
        </span>
        {title}
      </div>
    </div>
  );
}
