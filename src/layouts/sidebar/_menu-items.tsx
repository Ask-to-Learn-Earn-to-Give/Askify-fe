import routes from '@/config/routes';
import { HomeIcon } from '@/components/icons/home';
import { FarmIcon } from '@/components/icons/farm';
import { PoolIcon } from '@/components/icons/pool';
import { ProfileIcon } from '@/components/icons/profile';
import { DiskIcon } from '@/components/icons/disk';
import { ExchangeIcon } from '@/components/icons/exchange';
import { VoteIcon } from '@/components/icons/vote-icon';
import { PlusCircle } from '@/components/icons/plus-circle';
import { CompassIcon } from '@/components/icons/compass';
import { LivePricing } from '@/components/icons/live-pricing';
import { NormalGridIcon } from '@/components/icons/normal-grid';
export const menuItems = [
  {
    name: 'Home',
    icon: <HomeIcon />,
    href: routes.home,
  },
  {
    name: 'Problems',
    icon: <PoolIcon />,
    href: routes.problems,
    dropdownItems: [
      {
        name: 'Problems List',
        href: routes.problems,
      },
      {
        name: 'Create Problems',
        href: routes.createProblem,
      },
    ],
  },
  {
    name: 'NFTs',
    icon: <NormalGridIcon />,
    href: routes.search,
    dropdownItems: [
      {
        name: 'Explore NFTs',
        icon: <CompassIcon />,
        href: routes.search,
      },
      {
        name: 'Create NFT',
        icon: <PlusCircle />,
        href: routes.createNft,
      },
      {
        name: 'NFT Details',
        icon: <DiskIcon />,
        href: routes.nftDetails,
      },
    ],
  },
  {
    name: 'Profile',
    icon: <ProfileIcon />,
    href: routes.profile,
  },
  {
    name: 'Connect Room',
    icon: <ExchangeIcon />,
    href: routes.connectRoom,
  },
];
