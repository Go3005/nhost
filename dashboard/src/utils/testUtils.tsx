/* eslint-disable no-restricted-imports */
import DialogProvider from '@/components/common/DialogProvider/DialogProvider';
import RetryableErrorBoundary from '@/components/common/RetryableErrorBoundary';
import { ManagedUIContext } from '@/context/UIContext';
import { WorkspaceProvider } from '@/context/workspace-context';
import { UserDataProvider } from '@/context/workspace1-context';
import defaultTheme from '@/theme/default';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { NhostNextProvider } from '@nhost/nextjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { queries, Queries, RenderOptions } from '@testing-library/react';
import { render as rtlRender } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { Toaster } from 'react-hot-toast';
import createEmotionCache from './createEmotionCache';
import { nhost } from './nhost';

// Client-side cache, shared for the whole session of the user in the browser.
const emotionCache = createEmotionCache();
const queryClient = new QueryClient();

function Providers({ children }: PropsWithChildren<{}>) {
  return (
    <RetryableErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <CacheProvider value={emotionCache}>
          <NhostNextProvider nhost={nhost}>
            <WorkspaceProvider>
              <UserDataProvider>
                <ManagedUIContext>
                  <Toaster position="bottom-center" />
                  <ThemeProvider theme={defaultTheme}>
                    <DialogProvider>{children}</DialogProvider>
                  </ThemeProvider>
                </ManagedUIContext>
              </UserDataProvider>
            </WorkspaceProvider>
          </NhostNextProvider>
        </CacheProvider>
      </QueryClientProvider>
    </RetryableErrorBoundary>
  );
}

function render<
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container,
>(ui: ReactElement, options?: RenderOptions<Q, Container, BaseElement>) {
  return rtlRender(ui, { wrapper: Providers, ...options });
}

export * from '@testing-library/react';
export { render };
