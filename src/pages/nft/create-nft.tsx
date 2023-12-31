import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import RootLayout from '@/layouts/_root-layout';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import CreateNFTRetro from '@/components/create-nft/create-nft-retro';
import CreateNFT from '@/components/create-nft/create-nft';

const CreateNFTPage: NextPageWithLayout = () => {
  const { layout } = useLayout();

  // render default create NFT component
  return (
    <>
      <NextSeo title="Create NFT" description="Askify " />
      <CreateNFT />
    </>
  );
};

CreateNFTPage.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

export default CreateNFTPage;
