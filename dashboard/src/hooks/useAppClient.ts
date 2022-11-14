import { isDevOrStaging } from '@/utils/helpers';
import type { NhostClientConstructorParams } from '@nhost/nhost-js';
import { NhostClient } from '@nhost/nhost-js';
import { useCurrentWorkspaceAndApplication } from './useCurrentWorkspaceAndApplication';

export type UseAppClientOptions = NhostClientConstructorParams;
export type UseAppClientReturn = NhostClient;

/**
 * This hook returns an application specific Nhost client instance that can be
 * used to interact with the client's backend.
 *
 * @param options - Client configuration options
 * @returns Application specific Nhost client instance
 */
export function useAppClient(
  options?: UseAppClientOptions,
): UseAppClientReturn {
  const { currentApplication } = useCurrentWorkspaceAndApplication();

  if (process.env.NEXT_PUBLIC_ENV === 'dev') {
    return new NhostClient({
      subdomain: 'localhost:1337',
      start: false,
      ...options,
    });
  }

  return new NhostClient({
    subdomain: currentApplication.subdomain,
    region: isDevOrStaging()
      ? `${currentApplication.region.awsName}.staging`
      : currentApplication.region.awsName,
    start: false,
    ...options,
  });
}

export default useAppClient;
