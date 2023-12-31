import cn from 'classnames';
import Button from '@/components/ui/button';
import AnchorLink from '@/components/ui/links/anchor-link';
import { InfoIcon } from '@/components/icons/info-icon';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';

interface AuthorInformationProps {
  data: any;
  className?: string;
}

export default function AuthorInformation({
  className = 'md:hidden',
  data,
}: AuthorInformationProps) {
  const { layout } = useLayout();

  return (
    <div className={`${className}`}>
      {/* Bio */}
      <div className="border-y border-dashed border-gray-200 py-5 dark:border-gray-700 xl:py-6">
        <div className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
          Description
        </div>
        <div className="text-sm leading-6 tracking-tighter text-gray-600 dark:text-gray-400">
          {data?.description}
        </div>
      </div>

      {/* Social */}
      {/* {layout !== LAYOUT_OPTIONS.RETRO && (
        <div className="border-y border-dashed border-gray-200 py-5 dark:border-gray-700 xl:py-6">
          <div className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
            Social
          </div>
          {data?.socials?.map((social: any) => (
            <AnchorLink
              href={social?.link}
              className="mb-2 flex items-center gap-x-2 text-sm tracking-tight text-gray-600 transition last:mb-0 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
              key={`social-key-${social?.id}`}
            >
              {social?.icon}
              {social?.title}
            </AnchorLink>
          ))}
        </div>
      )} */}
    </div>
  );
}
