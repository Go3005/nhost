import type { DetailedHTMLProps, HTMLProps } from 'react';

export interface CardElement
  extends DetailedHTMLProps<HTMLProps<HTMLDivElement>, HTMLDivElement> {
  /**
   * Title for the framework.
   */
  title: string;
  /**
   * Description of the framework.
   */
  description: string;
  /**
   * Icon to display on the card.
   */
  icon: string | React.ReactElement;
  /**
   * Determines whether the icon should have a background.
   * @default false
   */
  disableIconBackground?: boolean;
  /**
   * Determines whether the icon is a react component.
   * @default true
   */
  iconIsComponent?: boolean;
  /**
   * Link to the specific framework documentation.
   */
  link?: string;
}

export const frameworks: CardElement[] = [
  {
    title: 'React',
    description: 'Guide to build a simple React app',
    icon: '/assets/frameworks/react.svg',
    link: 'https://docs.nhost.io/platform/quickstarts/react',
    iconIsComponent: false,
  },
  {
    title: 'Next.js',
    description: 'Nhost helps you to build with Next.js',
    icon: '/assets/frameworks/nextjs.svg',
    disableIconBackground: true,
    link: 'https://docs.nhost.io/platform/quickstarts/nextjs',
    iconIsComponent: false,
  },
  {
    title: 'RedwoodJS',
    description: 'Quickstart for RedwoodJS on Nhost',
    icon: '/assets/frameworks/redwood.svg',
    link: 'https://docs.nhost.io/platform/quickstarts/redwoodjs',
    iconIsComponent: false,
  },
  {
    title: 'Vue.js',
    description: 'Learn how to use Vue.js with Nhost',
    icon: '/assets/frameworks/vue.svg',
    link: 'https://docs.nhost.io/platform/quickstarts/vue',
    iconIsComponent: false,
  },
];
