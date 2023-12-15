import type { NextPageWithLayout } from '@/types';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import cn from 'classnames';
import routes from '@/config/routes';
import Button from '@/components/ui/button';
import Image from '@/components/ui/image';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import ProblemsList from '@/components/vote/problems-list';
import { ExportIcon } from '@/components/icons/export-icon';
// static data
import discuss from '@/assets/images/vote-pool.svg';
import RootLayout from '@/layouts/_root-layout';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
// Problems data

const ProposalsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { layout } = useLayout();

  function goToCreateProposalPage() {
    setTimeout(() => {
      router.push(routes.createProblem);
    }, 800);
  }
  const tabMenuItems = [
    {
      title: <>Waiting </>,
      path: 'preparing',
    },

    {
      title: <>In Progress </>,
      path: 'onprogress',
    },

    {
      title: (
        <>
          Solved{' '}
          {/* {totalPastVote > 0 && (
            <span className="ltr:ml-0.5 rtl:mr-0.5 ltr:md:ml-1.5 rtl:md:mr-1.5 ltr:lg:ml-2 rtl:lg:mr-2">
              {totalPastVote}
            </span>
          )} */}
        </>
      ),
      path: 'solved',
    },
  ];
  return (
    <>
      <NextSeo title="Problems" description="Askify " />
      <section className="mx-auto w-full max-w-[1160px] text-sm ">
        <header
          className={cn(
            'mb-8 flex flex-col gap-4 rounded-lg bg-white p-5 py-6 shadow-card dark:bg-light-dark xs:p-6 ',
            {
              'sm:flex-row sm:items-center sm:justify-between':
                layout !== LAYOUT_OPTIONS.RETRO,
              'lg:flex-row lg:items-center lg:justify-between':
                layout === LAYOUT_OPTIONS.RETRO,
            }
          )}
        >
          <div className="flex items-start gap-4 xs:items-center xs:gap-3 xl:gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-dark">
              <Image alt="Vote Pool" src={discuss} width={32} height={32} />
            </div>
            <div>
              <h2 className="mb-2 text-base font-medium uppercase dark:text-gray-100 xl:text-lg">
                Discover Problems
              </h2>
              <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                Discover problems in here and help our Users solve they
                problems.
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <Button
              shape="rounded"
              fullWidth={true}
              className="uppercase"
              onClick={() => goToCreateProposalPage()}
            >
              Create Problems
            </Button>
          </div>
        </header>
        <ParamTab tabMenu={tabMenuItems}>
          <TabPanel className="focus:outline-none">
            <ProblemsList status={'preparing'} />
          </TabPanel>

          <TabPanel className="focus:outline-none">
            <ProblemsList status={'onprogress'} />
          </TabPanel>

          <TabPanel className="focus:outline-none">
            <ProblemsList status={'solved'} />
          </TabPanel>
        </ParamTab>
      </section>
    </>
  );
};

ProposalsPage.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

export default ProposalsPage;
