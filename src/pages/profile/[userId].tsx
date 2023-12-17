import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import Image from '@/components/ui/image';
import Avatar from '@/components/ui/avatar';
import Profiles from '@/components/profile/profile';
// static data
import { authorData } from '@/data/static/author';
import RootLayout from '@/layouts/_root-layout';
import { ProblemSolverContext } from '@/context/ProblemSolverContext';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from '@/lib/axios';
const Profile = () => {
  const { layout } = useLayout();
  const router = useRouter();

  const { userId } = router.query;
  const { getNftInfo, getMyNft, userData } = useContext(ProblemSolverContext);
  const [user, setUser] = useState({});
  const [myNftList, setMyNftList] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const getUser = async () => {
      const res = await axios(`/api/user/${userId}`);
      const { user } = res.data;
      setUser(user);
    };
    getUser();
  }, [userId]);

  const handleGetMyNft = async () => {
    const data = await getMyNft();
    setMyNftList(data);
  };
  useEffect(() => {
    handleGetMyNft();
  }, []);
  console.log('userData', userData);
  console.log('myNftList', myNftList);
  // render default profile
  return (
    <>
      <NextSeo title="Profile" description="Askify " />
      <div className="h-18 relative w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-24 2xl:h-36 3xl:h-[200px]">
        <Image
          src={authorData?.cover_image?.thumbnail}
          placeholder="blur"
          fill
          className="object-cover"
          alt="Cover Image"
        />
      </div>
      <div className="mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
        {userData?.avatarUrl ? (
          <Avatar
            size="xl"
            image={userData?.avatarUrl}
            alt="Author"
            width={160}
            height={160}
            className="z-10 mx-auto -mt-12 dark:border-gray-500 sm:-mt-14 md:mx-0 md:-mt-16 xl:mx-0 3xl:-mt-20"
          />
        ) : (
          <Avatar
            size="xl"
            image={authorData?.avatar?.thumbnail}
            alt="Author"
            className="z-10 mx-auto -mt-12 dark:border-gray-500 sm:-mt-14 md:mx-0 md:-mt-16 xl:mx-0 3xl:-mt-20"
          />
        )}

        <Profiles userData={userData} myNftList={myNftList} />
      </div>
    </>
  );
};

Profile.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

export default Profile;
