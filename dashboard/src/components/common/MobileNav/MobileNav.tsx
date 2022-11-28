import { ChangePasswordModal } from '@/components/applications/ChangePasswordModal';
import FeedbackForm from '@/components/common/FeedbackForm';
import NavLink from '@/components/common/NavLink';
import { Nav } from '@/components/dashboard/Nav';
import { useUserDataContext } from '@/context/workspace1-context';
import useIsPlatform from '@/hooks/common/useIsPlatform';
import useProjectRoutes from '@/hooks/common/useProjectRoutes';
import { useNavigationVisible } from '@/hooks/useNavigationVisible';
import { Modal } from '@/ui/Modal';
import type { ButtonProps } from '@/ui/v2/Button';
import Button from '@/ui/v2/Button';
import Drawer from '@/ui/v2/Drawer';
import { Dropdown } from '@/ui/v2/Dropdown';
import MenuIcon from '@/ui/v2/icons/MenuIcon';
import XIcon from '@/ui/v2/icons/XIcon';
import type { ListItemButtonProps } from '@/ui/v2/ListItem';
import { ListItem } from '@/ui/v2/ListItem';
import { useSignOut } from '@nhost/nextjs';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { cloneElement, isValidElement, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export interface MobileNavProps extends ButtonProps {}

interface MobileNavLinkProps extends ListItemButtonProps {
  /**
   * Link to navigate to.
   */
  href: string;
  /**
   * Determines whether or not the link should be active if it's href exactly
   * matches the current route.
   */
  exact?: boolean;
  /**
   * Icon to display next to the text.
   */
  icon?: ReactNode;
}

function MobileNavLink({
  className,
  exact = true,
  href,
  icon,
  ...props
}: MobileNavLinkProps) {
  const router = useRouter();
  const baseUrl = `/${router.query.workspaceSlug}/${router.query.appSlug}`;
  const finalUrl = href && href !== '/' ? `${baseUrl}${href}` : baseUrl;

  const active = exact
    ? router.asPath === finalUrl
    : router.asPath.startsWith(finalUrl);

  return (
    <ListItem.Root className={twMerge('grid grid-flow-row gap-2', className)}>
      <ListItem.Button
        className="w-full"
        component={NavLink}
        href={finalUrl}
        selected={active}
        {...props}
      >
        <ListItem.Icon>
          {isValidElement(icon)
            ? cloneElement(icon, { ...icon.props, className: 'w-4.5 h-4.5' })
            : null}
        </ListItem.Icon>

        <ListItem.Text>{props.children}</ListItem.Text>
      </ListItem.Button>
    </ListItem.Root>
  );
}
export default function MobileNav({ className, ...props }: MobileNavProps) {
  const isPlatform = useIsPlatform();
  const { allRoutes } = useProjectRoutes();
  const shouldDisplayNav = useNavigationVisible();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const { signOut } = useSignOut();
  const { setUserContext } = useUserDataContext();
  const router = useRouter();

  return (
    <>
      <Modal
        showModal={showChangePasswordModal}
        close={() => setShowChangePasswordModal(false)}
      >
        {/** TODO: Make use of `DialogProvider` here or create a separate page. */}
        <ChangePasswordModal close={() => setShowChangePasswordModal(false)} />
      </Modal>

      <Button
        variant="borderless"
        color="secondary"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        className={twMerge('min-w-0 p-0', className)}
        onClick={() => setMenuOpen((current) => !current)}
        {...props}
      >
        {menuOpen ? <XIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
      </Button>

      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        className="z-[39] w-full sm:hidden"
        hideCloseButton
        componentsProps={{ backdrop: { className: 'pt-18' } }}
        PaperProps={{
          className: 'w-full px-4 pt-18 pb-12 grid grid-flow-row gap-6',
        }}
      >
        {shouldDisplayNav && (
          <section>
            <Nav
              flow="row"
              className="w-full"
              aria-label="Mobile navigation"
              listProps={{ className: 'gap-2' }}
            >
              {allRoutes.map(
                ({ relativePath, label, icon, exact, disabled }) => (
                  <MobileNavLink
                    href={relativePath}
                    key={relativePath}
                    className="w-full after:block after:h-px after:w-full after:bg-gray-200 last-of-type:after:hidden"
                    exact={exact}
                    icon={icon}
                    onClick={() => setMenuOpen(false)}
                    disabled={disabled}
                  >
                    {label}
                  </MobileNavLink>
                ),
              )}
            </Nav>
          </section>
        )}

        <section
          className={twMerge(
            'grid grid-flow-row gap-3',
            !shouldDisplayNav && 'mt-2',
          )}
        >
          <h2 className="text-xl font-semibold text-greyscaleDark">
            Resources
          </h2>

          <div className="grid grid-flow-row gap-2">
            {isPlatform && (
              <Dropdown.Root className="after:mt-2 after:block after:h-px after:w-full after:bg-gray-200">
                <Dropdown.Trigger
                  className="justify-initial w-full"
                  hideChevron
                >
                  <ListItem.Button
                    component="span"
                    className="w-full"
                    role={undefined}
                  >
                    <ListItem.Text>Feedback</ListItem.Text>
                  </ListItem.Button>
                </Dropdown.Trigger>

                <Dropdown.Content
                  transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                  <FeedbackForm className="max-w-md" />
                </Dropdown.Content>
              </Dropdown.Root>
            )}

            <ListItem.Button
              component={NavLink}
              href="https://docs.nhost.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItem.Text>Docs</ListItem.Text>
            </ListItem.Button>
          </div>
        </section>

        {isPlatform && (
          <section className={twMerge('grid grid-flow-row gap-3')}>
            <h2 className="text-xl font-semibold text-greyscaleDark">
              Account
            </h2>

            <div className="grid grid-flow-row gap-2">
              <div className="after:mt-2 after:block after:h-px after:w-full after:bg-gray-200">
                <Button
                  variant="borderless"
                  color="secondary"
                  className="w-full justify-start border-none px-2 py-2.5 text-[16px]"
                  onClick={() => {
                    setMenuOpen(false);
                    setShowChangePasswordModal(true);
                  }}
                >
                  Change password
                </Button>
              </div>

              <Button
                variant="borderless"
                color="secondary"
                className="justify-start border-none px-2 py-2.5 text-[16px]"
                onClick={async () => {
                  setUserContext({ workspaces: [] });
                  setMenuOpen(false);
                  await signOut();
                  await router.push('/signin');
                }}
              >
                Sign out
              </Button>
            </div>
          </section>
        )}
      </Drawer>
    </>
  );
}
