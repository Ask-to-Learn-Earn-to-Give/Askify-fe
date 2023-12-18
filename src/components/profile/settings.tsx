/* eslint-disable react-hooks/exhaustive-deps */
import Image from '@/components/ui/image';
import { useModal } from '@/components/modal-views/context';
import { useContext, useEffect, useState } from 'react';
import Button from '@/components/ui/button';
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import { ProblemSolverContext } from '@/context/ProblemSolverContext';
import useSocket from '@/hooks/useSocket';
import axios from '@/lib/axios';
import UploaderIpfs from '@/components/ui/forms/uploaderIpfs';
import InputLabel from '@/components/ui/input-label';
import { toast } from 'react-toastify';

export default function Settings({ ...props }) {
  const { closeModal } = useModal();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await axios.patch('/api/user/common-fields', {
        fullName: name,
        email: email,
        description: description,
        avatarUrl: image || undefined,
      });
      closeModal();
      setLoading(false);
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  return (
    <div
      className="relative z-50 mx-auto max-w-full rounded-lg bg-white px-9 py-16 dark:bg-light-dark md:w-[640px]"
      {...props}
    >
      <h2 className="mb-5 text-lg font-medium dark:text-gray-100 sm:mb-6 lg:mb-7 xl:text-xl">
        Settings Your Account
      </h2>
      <div className="mb-8">
        <InputLabel title="Upload file" important />
        <UploaderIpfs setFileImage={setImage} />
      </div>
      <div className="mb-2 rounded-lg bg-white p-5 shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark xs:p-4 xs:pb-6">
        <h3 className="mb-2 text-base font-medium dark:text-gray-100 xl:text-lg">
          Name
        </h3>

        <Input
          placeholder="Enter the name"
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-2 rounded-lg bg-white p-5 shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark xs:p-4 xs:pb-6">
        <h3 className="mb-2 text-base font-medium dark:text-gray-100 xl:text-lg">
          Email
        </h3>

        <Input
          placeholder="Enter the price"
          value={email}
          type="text"
          onChange={(e) => setEmail(e.target.value)}
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
        <Button onClick={onSubmit} shape="rounded" fullWidth={true}>
          {loading ? 'Loading...' : 'Confirm'}
        </Button>
      </div>
    </div>
  );
}
