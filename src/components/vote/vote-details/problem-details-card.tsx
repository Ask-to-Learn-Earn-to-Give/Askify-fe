import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dayjs from 'dayjs';
import cn from 'classnames';
import Button from '@/components/ui/button';
import RevealContent from '@/components/ui/reveal-content';
import AuctionCountdown from '@/components/nft/auction-countdown';
import { Switch } from '@/components/ui/switch';
import { ExportIcon } from '@/components/icons/export-icon';
import Comment from '@/components/vote/vote-details/comment';
import { fadeInBottom } from '@/lib/framer-motion/fade-in-bottom';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import { ChevronDown } from '@/components/icons/chevron-down';
import { useModal } from '@/components/modal-views/context';
import axios from '@/lib/axios';

function BidActionButton() {
  const { openModal } = useModal();
  const DATAPASSTEST = 'asdf';

  return (
    <div className="mt-4 flex items-center gap-3 xs:mt-6 xs:inline-flex md:mt-10">
      <Button
        shape="rounded"
        className="flex-1 xs:flex-auto"
        onClick={() => openModal('BID_PRICE', DATAPASSTEST)}
      >
        Bid Now
      </Button>
    </div>
  );
}

// FIXME: need to add vote type
export default function PropblemDetailCard({ prob }: any) {
  const [isExpand, setIsExpand] = useState(false);
  const { layout } = useLayout();
  const { openModal } = useModal();

  const DATAPASSTEST = 'HIHI';

  const [bids, setBids] = useState([]);

  useEffect(() => {
    if (!isExpand) {
      return;
    }

    async function getBids() {
      const {
        data: { problemBids: bids },
      } = await axios.get(`/problem/${prob._id}/bid?skip=0&limit=100`);
      setBids(bids);
    }

    getBids();
  }, [isExpand, prob._id]);

  return (
    <motion.div
      layout
      initial={{ borderRadius: 8 }}
      className={cn(
        'mb-3 rounded-lg bg-white p-5 transition-shadow duration-200 dark:bg-light-dark xs:p-6 xl:p-4',
        isExpand ? 'shadow-large' : 'shadow-card hover:shadow-large'
      )}
    >
      <motion.div
        layout
        className={cn('flex w-full flex-col-reverse justify-between ', {
          'md:grid md:grid-cols-3': layout !== LAYOUT_OPTIONS.RETRO,
          'lg:grid lg:grid-cols-3': layout === LAYOUT_OPTIONS.RETRO,
        })}
      >
        <div className="self-start md:col-span-2">
          <h3
            onClick={() => setIsExpand(!isExpand)}
            className="cursor-pointer text-base font-medium leading-normal dark:text-gray-100 2xl:text-lg"
          >
            {prob.title}
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Problems #{prob.onchainId}
          </p>

          {prob.status === 'waiting' && (
            <>
              {!isExpand ? (
                <Button
                  onClick={() => setIsExpand(!isExpand)}
                  className="mt-4 w-full xs:mt-6 xs:w-auto md:mt-10"
                  shape="rounded"
                >
                  Check Now
                </Button>
              ) : (
                <BidActionButton />
              )}
            </>
          )}

          {/* show only for past vote */}
          {prob.status === 'past' && (
            <time className="mt-4 block text-gray-400 xs:mt-6 md:mt-7">
              <span className="font-medium">Closed</span> at{' '}
              {dayjs(prob.executed_at).format('MMM DD, YYYY')}
            </time>
          )}
        </div>

        {/* vote countdown timer only for active & off-chain vote */}
        {['active', 'off-chain'].indexOf(prob.status) !== -1 && (
          <div
            className={cn(
              "before:content-[' '] relative grid h-full gap-2 before:absolute before:bottom-0 before:border-b before:border-r before:border-dashed before:border-gray-200 ltr:before:left-0 rtl:before:right-0 dark:border-gray-700 dark:before:border-gray-700 xs:gap-2.5 ",
              {
                'mb-5 pb-5 before:h-[1px] before:w-full md:mb-0 md:pb-0 md:before:h-full md:before:w-[1px] ltr:md:pl-5 rtl:md:pr-5 ltr:xl:pl-3 rtl:xl:pr-3':
                  layout !== LAYOUT_OPTIONS.RETRO,
                'mb-5 pb-5 before:h-[1px] before:w-full ltr:pl-0 lg:mb-0 lg:pb-0 lg:before:h-full lg:before:w-[1px] ltr:lg:pl-3 rtl:lg:pr-3':
                  layout === LAYOUT_OPTIONS.RETRO,
              }
            )}
          >
            <h3 className="text-gray-400 md:text-base md:font-medium md:uppercase md:text-gray-900 dark:md:text-gray-100 2xl:text-lg ">
              Stared Date
            </h3>
            <AuctionCountdown date={new Date(Date.now() + 172800000)} />
          </div>
        )}

        {/* switch toggle indicator for past vote */}
        {prob.status === 'solved' && (
          <div className="mb-4 flex items-center gap-3 md:mb-0 md:items-start md:justify-end">
            <Switch
              checked={isExpand}
              onChange={setIsExpand}
              className="flex items-center gap-3 text-gray-400"
            >
              <span className="inline-flex text-xs font-medium uppercase sm:text-sm">
                Close
              </span>
              <div
                className={cn(
                  isExpand
                    ? 'bg-brand dark:bg-white'
                    : 'bg-gray-200 dark:bg-gray-700',
                  'relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors duration-300'
                )}
              >
                <span
                  className={cn(
                    isExpand
                      ? 'bg-white ltr:translate-x-5 rtl:-translate-x-5 dark:bg-gray-700'
                      : 'bg-white ltr:translate-x-0.5 rtl:-translate-x-0.5 dark:bg-gray-200',
                    'inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform duration-200'
                  )}
                />
              </div>
              <span className="inline-flex text-xs font-medium uppercase sm:text-sm">
                View
              </span>
            </Switch>
          </div>
        )}
      </motion.div>
      <AnimatePresence>
        {isExpand && (
          <motion.div
            layout
            initial="exit"
            animate="enter"
            exit="exit"
            variants={fadeInBottom('easeIn', 0.25, 16)}
          >
            <div className="my-6 border-y border-dashed border-gray-200 py-6 text-gray-500 dark:border-gray-700 dark:text-gray-400">
              Created by:{' '}
              <a
                href={'/'}
                className="ml-1 inline-flex items-center gap-3 font-medium text-gray-900 hover:underline hover:opacity-90 focus:underline focus:opacity-90 dark:text-gray-100"
              >
                {prob.author.fullName} <ExportIcon className="h-auto w-3" />
              </a>
            </div>
            {/* Description */}
            <RevealContent defaultHeight={250}>
              <h4 className="mb-6 uppercase dark:text-gray-100">Description</h4>
              <div
                className="dynamic-html grid gap-2 leading-relaxed text-gray-600 dark:text-gray-400"
                dangerouslySetInnerHTML={{ __html: prob.description }}
              />
            </RevealContent>
            {/* Comment */}
            <RevealContent
              defaultHeight={320}
              className="mt-6 border-t border-dashed border-gray-200 pt-6 dark:border-gray-700"
            >
              <Comment title={'Bid Price Actions'} bids={bids} />
            </RevealContent>

            {prob.status === 'active' ? (
              <div className="mt-6 flex items-center justify-between border-t border-dashed border-gray-200 pt-6 dark:border-gray-700">
                <Button
                  shape="rounded"
                  fullWidth={true}
                  className={cn({
                    'sm:w-4/6 md:w-3/6 xl:w-2/6':
                      layout !== LAYOUT_OPTIONS.RETRO,
                    'w-full lg:w-3/6 2xl:w-[48%] 3xl:w-1/3':
                      layout === LAYOUT_OPTIONS.RETRO,
                  })}
                  onClick={() => openModal('BID_PRICE', DATAPASSTEST)}
                >
                  Bid Now
                </Button>
                <div
                  className="rotate-180 cursor-pointer p-8"
                  onClick={() => setIsExpand(!isExpand)}
                >
                  <ChevronDown />
                </div>
              </div>
            ) : (
              <div className="mt-6 flex items-center justify-between border-t border-dashed border-gray-200 pt-6 dark:border-gray-700">
                <p className="p-8"></p>
                <div
                  className="rotate-180 cursor-pointer p-8"
                  onClick={() => setIsExpand(!isExpand)}
                >
                  <ChevronDown />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
