import useIsPlatform from '@/hooks/common/useIsPlatform';
import { useCurrentWorkspaceAndApplication } from '@/hooks/useCurrentWorkspaceAndApplication';
import { generateRemoteAppUrl } from '@/utils/helpers';
import type { MutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type {
  TrackForeignKeyRelationsOptions,
  TrackForeignKeyRelationsVariables,
} from './trackForeignKeyRelations';
import trackForeignKeyRelations from './trackForeignKeyRelations';
import trackForeignKeyRelationsMigration from './trackForeignKeyRelationsMigration';

export interface UseTrackForeignKeyRelationsMutation
  extends Partial<TrackForeignKeyRelationsOptions> {
  /**
   * Props passed to the underlying mutation hook.
   */
  mutationOptions?: MutationOptions<
    void,
    unknown,
    TrackForeignKeyRelationsVariables
  >;
}

export default function useTrackForeignKeyRelationMutation({
  dataSource: customDataSource,
  appUrl: customAppUrl,
  adminSecret: customAdminSecret,
  mutationOptions,
}: UseTrackForeignKeyRelationsMutation = {}) {
  const isPlatform = useIsPlatform();
  const {
    query: { dataSourceSlug },
  } = useRouter();
  const { currentApplication } = useCurrentWorkspaceAndApplication();
  const appUrl = generateRemoteAppUrl(currentApplication?.subdomain);
  const mutationFn = isPlatform
    ? trackForeignKeyRelations
    : trackForeignKeyRelationsMigration;

  const mutation = useMutation(
    (variables) =>
      mutationFn({
        ...variables,
        appUrl: customAppUrl || appUrl,
        adminSecret:
          customAdminSecret || currentApplication?.hasuraGraphqlAdminSecret,
        dataSource: customDataSource || (dataSourceSlug as string),
      }),
    mutationOptions,
  );

  return mutation;
}
