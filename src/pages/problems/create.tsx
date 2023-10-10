import type { NextPageWithLayout } from '@/types';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import routes from '@/config/routes';
import Button from '@/components/ui/button';
import Image from '@/components/ui/image';
import { ExportIcon } from '@/components/icons/export-icon';
import { Close as CloseIcon } from '@/components/icons/close';
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import Listbox, { ListboxOption } from '@/components/ui/list-box';
// static data
import votePool from '@/assets/images/vote-pool.svg';
import RootLayout from '@/layouts/_root-layout';
import InputLabel from '@/components/ui/input-label';
import Uploader from '@/components/ui/forms/uploader';
import UploaderIpfs from '@/components/ui/forms/uploaderIpfs';

const CreateProposalPage: NextPageWithLayout = () => {
  const [fileImage, setFileImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [problemData, setProblemData] = useState({
    title: '',
    description: '',
    fileImage: '',
  });

  const handleCreateProblem = () => {
    setProblemData({
      title: title,
      description: description,
      fileImage: fileImage,
    });
  };

  console.log('problemData', problemData);
  const router = useRouter();
  function goToAllProposalPage() {
    setTimeout(() => {
      router.push(routes.problems);
    }, 800);
  }
  return (
    <>
      <NextSeo title="Create Problem" description="Askify " />
      <section className="mx-auto w-full max-w-[1160px] text-sm">
        <header className="mb-10 flex flex-col gap-4 rounded-lg bg-white p-5 py-6 shadow-card dark:bg-light-dark xs:p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4 xs:gap-3 xl:gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-dark">
              <Image alt="Vote Pool" src={votePool} width={32} height={32} />
            </div>
            <div>
              <h2 className="mb-2 text-base font-medium uppercase dark:text-gray-100 xl:text-lg">
                Describle your problem in here
              </h2>
              <p className="leading-[1.8] text-gray-600 dark:text-gray-400">
                In order to submit a problems you must have agrred with our
                policy <br className="hidden xl:inline-block" />{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="#"
                  className="inline-flex items-center gap-2 text-gray-900 underline transition-opacity duration-200 hover:no-underline hover:opacity-90 dark:text-gray-100"
                >
                  Learn more <ExportIcon className="h-auto w-3" />
                </a>
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <Button
              shape="rounded"
              fullWidth={true}
              className="uppercase"
              onClick={() => goToAllProposalPage()}
            >
              All Problems
            </Button>
          </div>
        </header>

        <h2 className="mb-5 text-lg font-medium dark:text-gray-100 sm:mb-6 lg:mb-7 xl:text-xl">
          Create a new problem
        </h2>

        <div className="mb-6 rounded-lg bg-white p-5 shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark xs:p-6 xs:pb-8">
          <h3 className="mb-2 text-base font-medium dark:text-gray-100 xl:text-lg">
            Title
          </h3>
          <p className="mb-5 leading-[1.8] dark:text-gray-300">
            Your title describle to your problems. Make sure it is clear and to
            the point.
          </p>
          <Input
            placeholder="Enter title of your proposal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-6 rounded-lg bg-white p-5 shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark xs:p-6 xs:pb-8">
          <h3 className="mb-2 text-base font-medium dark:text-gray-100 xl:text-lg">
            Description
          </h3>
          <p className="mb-5 leading-[1.8] dark:text-gray-300">
            Write your full detail of your problems.
          </p>
          <Textarea
            placeholder="Add the problem details here"
            inputClassName="md:h-32 xl:h-36"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-8">
          <InputLabel title="Upload Image" />
          {/* <Uploader /> */}
          <UploaderIpfs setFileImage={setFileImage} />
        </div>
        <div className="mt-6">
          <Button
            size="large"
            shape="rounded"
            fullWidth={true}
            className="xs:w-64 md:w-72"
            onClick={handleCreateProblem}
          >
            Create Problem
          </Button>
        </div>
      </section>
    </>
  );
};

CreateProposalPage.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

export default CreateProposalPage;
