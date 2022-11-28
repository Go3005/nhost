import DatabaseIcon from '@/ui/v2/icons/DatabaseIcon';
import GraphQLIcon from '@/ui/v2/icons/GraphQLIcon';
import StorageIcon from '@/ui/v2/icons/StorageIcon/StorageIcon';
import UserIcon from '@/ui/v2/icons/UserIcon';
import type { CardElement } from './frameworks';

export const features: CardElement[] = [
  {
    title: 'Database',
    description: 'Learn how to use Postgres with Nhost',
    icon: <DatabaseIcon className="h-8 w-8 text-greyscaleGreyDark" />,
    disableIconBackground: true,
    link: 'https://docs.nhost.io/platform/database',
  },
  {
    title: 'GraphQL API',
    description: 'Learn how to interact with the GraphQL API',
    icon: <GraphQLIcon className="h-8 w-8 text-greyscaleGreyDark" />,
    disableIconBackground: true,
    link: 'https://docs.nhost.io/platform/graphql',
  },
  {
    title: 'Authentication',
    description: 'Learn how to authenticate users with Nhost',
    icon: <UserIcon className="h-8 w-8 text-greyscaleGreyDark" />,
    disableIconBackground: true,
    link: 'https://docs.nhost.io/platform/authentication',
  },
  {
    title: 'Storage',
    description: 'Learn how to use Storage with Nhost',
    icon: <StorageIcon className="h-8 w-8 text-greyscaleGreyDark" />,
    disableIconBackground: true,
    link: 'https://docs.nhost.io/platform/storage',
  },
];

export default features;
