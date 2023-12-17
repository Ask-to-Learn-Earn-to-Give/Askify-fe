import cn from 'classnames';
import Button from '@/components/ui/button';
import { WalletContext } from '@/lib/hooks/use-connect';
import { Menu } from '@/components/ui/menu';
import { Transition } from '@/components/ui/transition';
import ActiveLink from '@/components/ui/links/active-link';
import { ChevronForward } from '@/components/icons/chevron-forward';
import { PowerIcon } from '@/components/icons/power';
import { useModal } from '@/components/modal-views/context';
import { useContext } from 'react';
import { useBalance } from 'wagmi';
import { config } from '@/state/chain/config';
import { useRouter } from 'next/router';
import { ProblemSolverContext } from '@/context/ProblemSolverContext';
import Image from '../ui/image';
import avartar from '@/assets/images/avatar/2.png';
export default function WalletConnect({
  btnClassName,
  anchorClassName,
}: {
  btnClassName?: string;
  anchorClassName?: string;
}) {
  const { openModal } = useModal();
  const { address, disconnect } = useContext(WalletContext);
  const { data, isError, isLoading } = useBalance({
    address,
  });
  const formattedBalance = data?.formatted
    ? Number(data?.formatted).toFixed(3)
    : '0.000';
  const { userData } = useContext(ProblemSolverContext);

  const router = useRouter();
  return (
    <>
      {address ? (
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          <div className="relative flex-shrink-0">
            <Menu>
              <Menu.Button className="block h-10 w-10 overflow-hidden rounded-full border-3 border-solid border-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-main transition-all hover:-translate-y-0.5 hover:shadow-large dark:border-gray-700 sm:h-12 sm:w-12"></Menu.Button>
              <Transition
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-300"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-4"
              >
                <Menu.Items className="absolute -right-20 mt-3 w-72 origin-top-right rounded-lg bg-white shadow-large dark:bg-gray-900 sm:-right-14">
                  <Menu.Item>
                    <div className="cursor-pointer border-b border-dashed border-gray-200 p-3 dark:border-gray-700 ">
                      <div
                        onClick={() => router.push(`/profile/${userData._id}`)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
                      >
                        {userData?.avatarUrl ? (
                          <Image
                            src={userData?.avatarUrl}
                            className="object-cover"
                            alt="Cover Image"
                            width={40}
                            height={40}
                          />
                        ) : (
                          <Image
                            src={avartar}
                            className="object-cover"
                            alt="Cover Image"
                            width={40}
                            height={40}
                          />
                        )}

                        {/* <span className="h-8 w-8 rounded-full border-2 border-solid border-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:border-gray-700"></span> */}
                        <span className="grow uppercase">
                          View Your Profile
                        </span>
                        <ChevronForward />
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <Menu.Item>
                      <div className="border-b border-dashed border-gray-200 px-6 py-5 dark:border-gray-700">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-medium -tracking-tighter text-gray-600 dark:text-gray-400">
                            Balance
                          </span>
                          <span className="rounded-lg bg-gray-100 px-2 py-1 text-sm tracking-tighter dark:bg-gray-800">
                            {address.slice(0, 6)}
                            {'...'}
                            {address.slice(address.length - 6)}
                          </span>
                        </div>
                        <div className="mt-3 font-medium uppercase tracking-wider text-gray-900 dark:text-white">
                          {formattedBalance} {data?.symbol}
                        </div>
                      </div>
                    </Menu.Item>
                  </Menu.Item>
                  <Menu.Item>
                    <div className="p-3">
                      <div
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
                        onClick={disconnect}
                      >
                        <PowerIcon />
                        <span className="grow uppercase">Disconnect</span>
                      </div>
                    </div>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          <ActiveLink href="/problems/create" className={cn(anchorClassName)}>
            <Button
              className={cn('shadow-main hover:shadow-large', btnClassName)}
            >
              CREATE
            </Button>
          </ActiveLink>
        </div>
      ) : (
        <Button
          onClick={() => openModal('WALLET_CONNECT_VIEW')}
          className={cn('shadow-main hover:shadow-large', btnClassName)}
        >
          CONNECT
        </Button>
      )}
    </>
  );
}
