import ApplicationErrored from '@/components/applications/ApplicationErrored';
import ApplicationLive from '@/components/applications/ApplicationLive';
import ApplicationMigrating from '@/components/applications/ApplicationMigrating';
import ApplicationPaused from '@/components/applications/ApplicationPaused';
import ApplicationProvisioning from '@/components/applications/ApplicationProvisioning';
import ApplicationRestoring from '@/components/applications/ApplicationRestoring';
import ApplicationUnknown from '@/components/applications/ApplicationUnknown';
import ApplicationUnpausing from '@/components/applications/ApplicationUnpausing';
import ProjectLayout from '@/components/layout/ProjectLayout';
import useIsPlatform from '@/hooks/common/useIsPlatform';
import useApplicationState from '@/hooks/useApplicationState';
import { useCurrentWorkspaceAndApplication } from '@/hooks/useCurrentWorkspaceAndApplication';
import { ApplicationStatus } from '@/types/application';
import type { ReactElement } from 'react';

export default function AppIndexPage() {
  const isPlatform = useIsPlatform();
  const applicationState = useApplicationState();
  const { currentApplication } = useCurrentWorkspaceAndApplication();

  if (!isPlatform) {
    return <ApplicationLive />;
  }

  if (currentApplication?.desiredState === ApplicationStatus.Migrating) {
    return <ApplicationMigrating />;
  }

  switch (applicationState) {
    case ApplicationStatus.Empty:
      return <ApplicationProvisioning />;
    case ApplicationStatus.Provisioning:
      return <ApplicationProvisioning />;
    case ApplicationStatus.Updating:
      return <ApplicationLive />;
    case ApplicationStatus.Live:
      return <ApplicationLive />;
    case ApplicationStatus.Migrating:
      return <ApplicationMigrating />;
    case ApplicationStatus.Errored:
      return <ApplicationErrored />;
    case ApplicationStatus.Paused:
      return <ApplicationPaused />;
    case ApplicationStatus.Unpausing:
      return <ApplicationUnpausing />;
    case ApplicationStatus.Restoring:
      return <ApplicationRestoring />;
    default:
      return <ApplicationUnknown />;
  }
}

AppIndexPage.getLayout = function getLayout(page: ReactElement) {
  return <ProjectLayout>{page}</ProjectLayout>;
};
