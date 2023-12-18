import Image from '@/components/ui/image';
import cn from 'classnames';
import { StaticImageData } from 'next/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import Avatar from '@/components/ui/avatar';
import InputLabel from './input-label';
import AuthorImage from '@/assets/images/author.jpg';
import NFT1 from '@/assets/images/collection/grid/4.jpg';
import axios from '@/lib/axios';

type ItemType = {
  image: string;
  key: string;
  name: string;
  price: any;
  tokenId: string;
};
type UserDataType = {
  avatarUrl: any;
  fullName: string;
  address: string;
};

type CardProps = {
  item: ItemType;
  className?: string;
  userData: UserDataType;
  setMessages: any;
  setChatGroup: any;
};

export default function CollectionCard({
  item,
  className = '',
  userData,
  setMessages,
  setChatGroup,
}: CardProps) {
  const { image, key, name, price, tokenId } = item ?? {};

  const fetchData = async (_id: any) => {
    try {
      const { messages } = (
        await axios.get(`/api/chat/${_id}/messages?skip=0&limit=1024`)
      ).data;
      const { chatGroup } = (await axios.get(`/api/chat/${_id}`)).data;
      console.log('messages', messages);
      setMessages(messages);
      setChatGroup(chatGroup);
    } catch (error) {
      console.log('error');
    }
  };
  const getMessId = async (id: any) => {
    try {
      await fetchData(id);
    } catch (error) {
      console.log('error');
    }
  };
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg transition-transform hover:-translate-y-1 ',
        className
      )}
    >
      <div className="hidden flex-col lg:flex ">
        {/* NFT preview */}
        <InputLabel title="" />
        <div
          onClick={() => getMessId(key)}
          className="relative flex  flex-grow cursor-pointer flex-col overflow-hidden rounded-lg bg-gray-200  shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark"
        >
          <div className="flex items-center  p-4 text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400">
            {userData?.avatarUrl ? (
              <Avatar
                size="sm"
                width={40}
                height={40}
                image={userData?.avatarUrl}
                alt="user data Avatar"
                className="border-white bg-gray-300 ltr:mr-3 rtl:ml-3 dark:bg-gray-400"
              />
            ) : (
              <Avatar
                size="sm"
                image={AuthorImage}
                alt="Askif"
                className="border-white bg-gray-300 ltr:mr-3 rtl:ml-3 dark:bg-gray-400"
              />
            )}
            @{userData?.fullName ? userData?.fullName : userData?.address}
          </div>
          <div className="relative block w-full">
            {image ? (
              <Image
                src={image}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,..."
                width={600}
                height={600}
                alt="nft image"
              />
            ) : (
              <Image
                src={NFT1}
                placeholder="blur"
                width={600}
                height={600}
                alt="Pulses of Imagination #214"
              />
            )}
          </div>
          <div className="p-5">
            <div className="text-sm font-medium text-black dark:text-white">
              {name ? name : ' Pulses Of Imagination #214'}
            </div>
            <div className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              {price ? price : '100'} Klay
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
