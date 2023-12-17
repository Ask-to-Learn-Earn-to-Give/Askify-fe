import { ExportIcon } from '@/components/icons/export-icon';
import Button from '@/components/ui/button';
import { ProblemSolverContext } from '@/context/ProblemSolverContext';
import { useContext, useState } from 'react';
import Web3 from 'web3';
import { useRouter } from 'next/router';

export default function Comment({ title, bids, problem }: any) {
  const { address, selectedExpert } = useContext(ProblemSolverContext);
  const router = useRouter();

  const handleSelected = async ({
    problemOnchainId,
    problemBidOnchainId,
    value,
  }: any) => {
    try {
      const selected = await selectedExpert(
        problemOnchainId,
        problemBidOnchainId,
        value
      );
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <>
      <h4 className="mb-6 uppercase dark:text-gray-100">{title}</h4>
      {bids?.map((item: any, index: number) => (
        <div key={item._id} className="mt-6">
          <div className="my-6 flex items-start gap-3 border-t border-dashed border-gray-200 py-4 text-gray-500 dark:border-gray-700 dark:text-gray-400">
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
                    className="mt-1 w-[200px] xs:mt-2 xs:w-auto md:mt-4"
                    shape="rounded"
                    variant="ghost"
                  >
                    Select
                  </Button>
                </div>
              ) : (
                problem.status !== 'waiting' &&
                problem.expert?.address.toString().toLowerCase() ==
                  item.expert?.address &&
                (address?.toString().toLowerCase() ==
                  problem.author.address?.toString().toLowerCase() ||
                  address?.toString().toLowerCase() ==
                    problem.expert.address?.toString().toLowerCase()) && (
                  <div className="mt-4 flex w-[200px] items-center gap-3 xs:mt-6 xs:inline-flex md:mt-10">
                    <Button
                      shape="rounded"
                      className="flex-1 xs:flex-auto"
                      onClick={() =>
                        router.push(`/problems/${problem._id}/chat`)
                      }
                    >
                      Chat
                    </Button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
