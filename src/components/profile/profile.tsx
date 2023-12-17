import { useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import AuthorInformation from '@/components/author/author-information';
import { authorData } from '@/data/static/author';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import ProfileTab from '@/components/profile/profile-tab';
import Message from '../chatUi/Message';

export default function Profile({ userData, myNftList }: any) {
  const [copyButtonStatus, setCopyButtonStatus] = useState(false);
  const [messagesNFT, setMessages] = useState<any>();
  const [chatgoupNFT, setChatGroup] = useState<any>();
  const [_, copyToClipboard] = useCopyToClipboard();
  function handleCopyToClipboard() {
    copyToClipboard(userData?.address);
    setCopyButtonStatus(true);
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 2500);
  }
  return (
    <div className="flex w-full flex-col pt-4 md:flex-row md:pt-4 lg:flex-row 3xl:pt-6">
      <div className=" flex w-1/2 shrink-0 flex-col border-dashed border-gray-200 dark:border-gray-700  ltr:md:border-r md:ltr:pr-7 rtl:md:border-l md:rtl:pl-7 lg:ltr:pr-10 lg:rtl:pl-10   3xl:ltr:pr-14 3xl:rtl:pl-14">
        <div className="text-center ltr:md:text-left rtl:md:text-right">
          <h2 className="text-xl font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl">
            {userData?.fullName}
          </h2>
          <div className="mt-1 text-sm font-medium tracking-tighter text-gray-600 dark:text-gray-400 xl:mt-3">
            @{userData?.fullName}
          </div>
          <div className="md:max-w-auto mx-auto mt-5 flex h-9 max-w-sm items-center rounded-full bg-white shadow-card dark:bg-light-dark md:mx-0 xl:mt-6">
            <div className="inline-flex h-full shrink-0 grow-0 items-center rounded-full bg-gray-900 px-4 text-xs text-white sm:text-sm">
              #{authorData?.id}
            </div>
            <div className="text truncate text-ellipsis bg-center text-xs text-gray-500 ltr:pl-4 rtl:pr-4 dark:text-gray-300 sm:text-sm">
              {userData?.address}
            </div>
            <div
              title="Copy Address"
              className="flex cursor-pointer items-center px-4 text-gray-500 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              onClick={() => handleCopyToClipboard()}
            >
              {copyButtonStatus ? (
                <Check className="h-auto w-3.5 text-green-500" />
              ) : (
                <Copy className="h-auto w-3.5" />
              )}
            </div>
          </div>
          <AuthorInformation className="hidden md:block" data={userData} />
        </div>
        <div className="h-[100vh] overflow-y-auto rounded bg-gray-100 dark:bg-light-dark">
          <div>
            {messagesNFT ? (
              <div>
                {messagesNFT?.map((message: any, index: any) => {
                  const user = chatgoupNFT?.members.find(
                    ({ _id }: any) => _id == message?.senderId
                  );
                  return (
                    <Message
                      key={message?._id}
                      content={message?.content}
                      senderName={user?.fullName}
                      senderAvatar={user.avatarUrl}
                      sentByCurrentUser={
                        message?.senderId == chatgoupNFT?.ownerId
                      }
                    />
                  );
                })}
              </div>
            ) : (
              <h1 className=" text-center">Select Your NFT to show data</h1>
            )}
          </div>
        </div>
      </div>
      <div className="grow pb-9 pt-6 md:-mt-2.5 md:pb-0 md:pt-1.5 md:ltr:pl-7 md:rtl:pr-7 lg:ltr:pl-10 lg:rtl:pr-10 3xl:ltr:pl-14 3xl:rtl:pr-14">
        <ProfileTab
          myNftList={myNftList}
          userData={userData}
          setMessages={setMessages}
          setChatGroup={setChatGroup}
        />
      </div>
    </div>
  );
}
