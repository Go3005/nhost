import type { IconLinkProps } from '@/components/common/IconLink';
import IconLink from '@/components/common/IconLink';
import { Nav } from '@/components/dashboard/Nav';
import useProjectRoutes from '@/hooks/common/useProjectRoutes';
import { useRouter } from 'next/router';
import type { DetailedHTMLProps, HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

export interface DesktopNavProps
  extends Omit<
    DetailedHTMLProps<HTMLProps<HTMLDivElement>, HTMLDivElement>,
    'children'
  > {}

interface DesktopNavLinkProps extends IconLinkProps {
  /**
   * Determines whether or not the link should be active if it's href exactly
   * matches the current route.
   *
   * @default true
   */
  exact?: boolean;
  /**
   * Path of the link.
   */
  path?: string;
}

function DesktopNavLink({
  exact = true,
  href,
  path,
  ...props
}: DesktopNavLinkProps) {
  const router = useRouter();
  const baseUrl = `/${router.query.workspaceSlug}/${router.query.appSlug}`;
  const finalUrl = href && href !== '/' ? `${baseUrl}${href}` : baseUrl;
  const finalRelativePath =
    path && path !== '/' ? `${baseUrl}${path}` : baseUrl;

  const active = exact
    ? router.asPath === finalUrl
    : router.asPath.startsWith(finalRelativePath);

  return (
    <li>
      <IconLink {...props} href={finalUrl} active={props.active || active} />
    </li>
  );
}

export default function DesktopNav({ className, ...props }: DesktopNavProps) {
  const { allRoutes } = useProjectRoutes();

  return (
    <aside
      className={twMerge(
        'w-20 content-start overflow-hidden overflow-y-auto border-r-1 border-gray-200 px-1 pb-10',
        className,
      )}
      {...props}
    >
      <Nav
        aria-label="Main navigation"
        className="w-full"
        flow="row"
        listProps={{ className: 'gap-2 justify-center py-2' }}
      >
        {allRoutes.map(
          ({
            relativePath,
            relativeMainPath,
            label,
            icon,
            exact,
            disabled,
          }) => (
            <DesktopNavLink
              href={relativePath}
              path={relativeMainPath || relativePath}
              exact={exact}
              icon={icon}
              key={relativePath}
              disabled={disabled}
            >
              {label}
            </DesktopNavLink>
          ),
        )}
      </Nav>
    </aside>
  );
}
