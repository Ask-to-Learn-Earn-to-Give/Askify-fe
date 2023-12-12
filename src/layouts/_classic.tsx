import cn from 'classnames';
import Header from '@/layouts/header/header';
import Sidebar from '@/layouts/sidebar/_expandable';
import FooterSmall from '@/components/Footers/FooterSmall';
import footerSmall from '@/data/static/Footer/footersmall';
export default function ClassicLayout({
  children,
  contentClassName,
}: React.PropsWithChildren<{ contentClassName?: string }>) {
  return (
    <div className="ltr:xl:pl-24 rtl:xl:pr-24 ltr:2xl:pl-28 rtl:2xl:pr-28 ">
      <Header />
      <Sidebar className="hidden xl:block" />
      <main
        className={cn(
          'min-h-[75vh]  px-4 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-8 xl:pb-24 xl:pt-5 3xl:px-10',
          contentClassName
        )}
      >
        {children}
      </main>
      <FooterSmall {...footerSmall} />
    </div>
  );
}
