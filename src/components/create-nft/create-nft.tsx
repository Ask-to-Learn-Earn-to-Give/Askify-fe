import { useContext, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { NextSeo } from 'next-seo';
import { Transition } from '@/components/ui/transition';
import { Listbox } from '@/components/ui/listbox';
import Image from '@/components/ui/image';

import Button from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import Uploader from '@/components/ui/forms/uploader';
import InputLabel from '@/components/ui/input-label';
import { ChevronDown } from '@/components/icons/chevron-down';
import Avatar from '@/components/ui/avatar';
import Preview from '@/components/create-nft/nft-preview';

//images
import AuthorImage from '@/assets/images/author.jpg';
import NFT1 from '@/assets/images/nft/nft-1.jpg';
import PriceType from '@/components/create-nft/price-types-props';
import useSocket from '@/hooks/useSocket';
import { useRouter } from 'next/router';
import axios from '@/lib/axios';
import { useAccount } from 'wagmi';
import { ProblemSolverContext } from '@/context/ProblemSolverContext';
import UploaderIpfs from '@/components/ui/forms/uploaderIpfs';

export default function CreateNFT() {
  const { address, mintNft, userData } = useContext(ProblemSolverContext);
  const router = useRouter();
  let [publish, setPublish] = useState(true);
  let [priceType, setPriceType] = useState('fixed');
  const [allProblems, setAllProblems] = useState<any>([]);
  const { address: address_ } = useAccount();
  const [problemsList, setProblemsList] = useState<any>([]);
  //
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  useEffect(() => {
    async function getProblems() {
      const {
        data: { problems },
      } = await axios.get('/api/problem?skip=0&limit=100');
      setAllProblems(problems);
    }

    getProblems();
  }, []);
  const problemsChatGroupId: any = useMemo(() => {
    return allProblems.filter(
      (prop: any) =>
        prop.author?.address.toString().toLowerCase() ===
          address_?.toString().toLowerCase() && prop.expert !== undefined
    );
  }, [allProblems, address_]);

  // mint NFTCard
  const handleMintNft = async () => {
    if (!quantity || !name || !image || !problemsList?.chatGroupId || !price) {
      console.log('data missing');
    } else mintNft(quantity, name, image, problemsList?.chatGroupId, price);
  };
  return (
    <>
      <NextSeo title="Create NFT" description="Askify " />
      <div className="mx-auto w-full sm:pt-0 lg:px-8 xl:px-10 2xl:px-0">
        <div className="mb-6 grid grid-cols-3 gap-12 sm:mb-10">
          <div className="col-span-3 flex items-center justify-between lg:col-span-2">
            <h2 className="text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white  sm:text-2xl">
              Create New Item
            </h2>
          </div>
        </div>
        <div className="mb-8 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* File uploader */}
            <div className="mb-8">
              <InputLabel title="Upload file" important />
              <UploaderIpfs setFileImage={setImage} />
            </div>

            {/* NFT price type */}
            <div className="flex items-center justify-between gap-4">
              <InputLabel
                title="Put on marketplace"
                subTitle="Enter price to allow users instantly purchase your NFT"
              />
              <div className="shrink-0">
                <Switch checked={publish} onChange={() => setPublish(!publish)}>
                  <div
                    className={cn(
                      publish
                        ? 'bg-brand dark:!bg-white'
                        : 'bg-gray-200 dark:bg-gray-700',
                      'relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors duration-300'
                    )}
                  >
                    <span
                      className={cn(
                        publish
                          ? 'bg-white ltr:translate-x-5 rtl:-translate-x-5 dark:bg-light-dark'
                          : 'bg-white ltr:translate-x-0.5 rtl:-translate-x-0.5 dark:bg-light-dark',
                        'inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform duration-200'
                      )}
                    />
                  </div>
                </Switch>
              </div>
            </div>
            {publish && <PriceType value={priceType} onChange={setPriceType} />}
          </div>

          <div className="hidden flex-col lg:flex">
            {/* NFT preview */}
            <InputLabel title="Preview" />
            <div className="relative flex flex-grow flex-col overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark">
              <div className="flex items-center p-4 text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400">
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
                    width={700}
                    height={700}
                    alt="nft image"
                  />
                ) : (
                  <Image
                    src={NFT1}
                    placeholder="blur"
                    width={700}
                    height={700}
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

        {/* Price */}
        <div className="mb-8">
          <InputLabel title="Price" important />
          <Input
            min={0}
            type="number"
            placeholder="Enter your price"
            inputClassName="spin-button-hidden"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Name */}
        <div className="mb-8">
          <InputLabel title="Name" important />
          <Input
            type="text"
            placeholder="Item name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="mb-8">
          <InputLabel
            title="Description"
            subTitle="The description will be included on the item's detail page underneath its image."
          />
          <Textarea
            placeholder="Provide a detailed description of your item"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Supply */}
        <div className="mb-8">
          <InputLabel
            title="Supply"
            subTitle="The number of items that can be minted."
          />
          <Input type="number" placeholder="1" disabled />
        </div>

        {/* problems */}
        <div className="mb-8">
          <InputLabel title="Problems" />
          <div className="relative">
            <Listbox
              value={problemsChatGroupId}
              onChange={(value) => setProblemsList(value)}
            >
              <Listbox.Button className="text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5">
                <div className="flex items-center">{problemsList?.title}</div>
                <ChevronDown />
              </Listbox.Button>
              <Transition
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute left-0 z-10 mt-1 grid w-full origin-top-right gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-gray-700 dark:bg-gray-800 xs:p-2">
                  {problemsChatGroupId.map((option: any) => (
                    <Listbox.Option key={option?.chatGroupId} value={option}>
                      {({ selected }) => (
                        <div
                          className={`flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100  ${
                            selected
                              ? 'bg-gray-200/70 font-medium dark:bg-gray-600/60'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700/70'
                          }`}
                        >
                          {option?.title}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>
        </div>

        <Button onClick={handleMintNft} shape="rounded">
          CREATE
        </Button>
      </div>
    </>
  );
}
