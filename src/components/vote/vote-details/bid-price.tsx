/* eslint-disable react-hooks/exhaustive-deps */
import Image from '@/components/ui/image';
import { useModal } from '@/components/modal-views/context';
import { useContext, useEffect, useState } from 'react';
import Button from '@/components/ui/button';
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';

export default function BidPrice({ ...props }) {
  const { closeModal, data } = useModal();
  console.log('data', data);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [commentData, setCommentData] = useState({
    title: '',
    price: 0,
    description: '',
  });
  const handleCreateProblem = () => {
    setCommentData({
      title: title,
      price: price,

      description: description,
    });
  };
  return (
    <div
      className="relative z-50 mx-auto max-w-full rounded-lg bg-white px-9 py-16 dark:bg-light-dark md:w-[640px]"
      {...props}
    >
      <h2 className="mb-5 text-lg font-medium dark:text-gray-100 sm:mb-6 lg:mb-7 xl:text-xl">
        Bid Price
      </h2>
      <div className="mb-2 rounded-lg bg-white p-5 shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark xs:p-4 xs:pb-6">
        <h3 className="mb-2 text-base font-medium dark:text-gray-100 xl:text-lg">
          Title
        </h3>

        <Input
          placeholder="Enter the title "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-2 rounded-lg bg-white p-5 shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark xs:p-4 xs:pb-6">
        <h3 className="mb-2 text-base font-medium dark:text-gray-100 xl:text-lg">
          Price
        </h3>

        <Input
          placeholder="Enter the price"
          value={price}
          type="number"
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>
      <div className="mb-2 rounded-lg bg-white p-5 shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark xs:p-4 xs:pb-6">
        <h3 className="mb-2 text-base font-medium dark:text-gray-100 xl:text-lg">
          Description
        </h3>

        <Textarea
          placeholder="Add your description details here"
          inputClassName="md:h-32 xl:h-36"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-dashed border-gray-200 pt-6 dark:border-gray-700">
        <Button shape="rounded" fullWidth={true} onClick={handleCreateProblem}>
          Bid
        </Button>
      </div>
    </div>
  );
}
