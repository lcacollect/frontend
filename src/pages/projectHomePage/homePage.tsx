import { RecentProjectsPaper, ProjectsTable } from '@lcacollect/project'
import { PaperPageStack } from '@lcacollect/components'
import { useMemo } from 'react'
import { useGetAccountRolesQuery } from '../../dataAccess'

export const ProjectsHomePage = () => {
  const { data: accountData } = useGetAccountRolesQuery()
  const isAdmin = useMemo(
    () => (accountData ? accountData.account.roles.indexOf('lca_super_admin') > -1 : false),
    [accountData],
  )

  const canCreateProjects = useMemo(
    () => isAdmin || (accountData ? accountData.account.roles.indexOf('project.create') > -1 : false),
    [accountData, isAdmin],
  )

  return (
    <PaperPageStack data-testid='projects-homepage'>
      <RecentProjectsPaper />
      <ProjectsTable
        canCreateProjects={canCreateProjects}
        createButtonToolTip={canCreateProjects ? undefined : 'Call Molio to get project create rights'}
      />
    </PaperPageStack>
  )
}
