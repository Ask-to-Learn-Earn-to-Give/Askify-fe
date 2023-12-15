import { ExportIcon } from '@/components/icons/export-icon';
import Button from '@/components/ui/button';
import { ProblemSolverContext } from '@/context/ProblemSolverContext';
import { useContext, useState } from 'react';
import Web3 from 'web3';

export default function Comment({ title, bids, problem }: any) {
  const { address, selectedExpert } = useContext(ProblemSolverContext);
  console.log('items', bids);

  const handleSelected = async ({
    problemOnchainId,
    problemBidOnchainId,
    value,
  }: any) => {
    const selected = await selectedExpert(
      problemOnchainId,
      problemBidOnchainId,
      value
    );
  };

  return (
    <>
      <h4 className="mb-6 uppercase dark:text-gray-100">{title}</h4>
      {bids?.map((item: any, index: number) => (
        <div key={item._id} className="mt-6">
          <div className="my-6 flex items-start gap-3 border-y border-dashed border-gray-200 py-4 text-gray-500 dark:border-gray-700 dark:text-gray-400">
            <span className="shrink-0 text-gray-600 dark:text-gray-400">
              {index + 1}
            </span>
            <div className="grid gap-4">
              <div className="flex items-start gap-1">
                <span className="w-40 shrink-0 text-gray-600 dark:text-gray-400">
                  Fee
                </span>{' '}
                <a
                  href={'/'}
                  className="inline-flex items-center gap-1.5 font-medium hover:underline hover:opacity-90 focus:underline focus:opacity-90 dark:text-gray-300"
                >
                  <span className="shrink-0">
                    {Web3.utils.fromWei(item.amount, 'ether')}
                  </span>{' '}
                  KLAY
                </a>
              </div>

              <div className="flex items-start gap-1">
                <span className="w-40 shrink-0 text-gray-600 dark:text-gray-400">
                  Expert
                </span>{' '}
                <span className="word-break-all font-medium leading-relaxed dark:text-gray-300">
                  {item.expert.fullName}
                </span>
              </div>

              <div className="flex items-start gap-1">
                <span className="w-40 shrink-0 text-gray-600 dark:text-gray-400">
                  Description
                </span>{' '}
                <span className="font-medium dark:text-gray-300">
                  {item.description}
                </span>
              </div>
              <div className="flex items-start gap-1">
                <span className="w-40 shrink-0 text-gray-600 dark:text-gray-400">
                  Wallet
                </span>{' '}
                <span className="word-break-all font-medium leading-relaxed dark:text-gray-300">
                  {item.expert.address}
                </span>
              </div>

              {problem.status === 'waiting' &&
              address?.toString().toLowerCase() ==
                problem.author.address?.toString().toLowerCase() ? (
                <div className="flex flex-row">
                  <Button
                    onClick={() =>
                      handleSelected({
                        problemOnchainId: problem.onchainId,
                        problemBidOnchainId: item.onchainId,
                        value: item.amount,
                      })
                    }
                    className="w-200 mt-1 xs:mt-2 xs:w-auto md:mt-4"
                    shape="rounded"
                    variant="ghost"
                  >
                    Select
                  </Button>
                </div>
              ) : (
                <div className="flex flex-row">
                  <Button
                    // onClick={}
                    className="w-200 mt-1 xs:mt-2 xs:w-auto md:mt-4"
                    shape="rounded"
                    variant="ghost"
                  >
                    View Infomation
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
