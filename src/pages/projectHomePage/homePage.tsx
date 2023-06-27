import { RecentProjectsPaper, ProjectsTable } from '@lcacollect/project'
import { PaperPageStack } from '@lcacollect/components'
import { useMemo } from 'react'
import { GraphQlEpdEdge, useAddProjectEpdsMutation, useGetAccountRolesQuery, useGetEpdsQuery } from '../../dataAccess'

export const ProjectsHomePage = () => {
  const { data: accountData } = useGetAccountRolesQuery()
  const { data: epdData } = useGetEpdsQuery({
    variables: { count: 450, filters: { source: { equal: 'BR18 - Tabel 7' } } },
  })
  const [addProjectEpds] = useAddProjectEpdsMutation()

  const isAdmin = useMemo(
    () => (accountData ? accountData.account.roles.indexOf('lca_super_admin') > -1 : false),
    [accountData],
  )

  const canCreateProjects = useMemo(
    () => isAdmin || (accountData ? accountData.account.roles.indexOf('project.create') > -1 : false),
    [accountData, isAdmin],
  )

  const addEpdsToProject = async (projectId: string) => {
    await addProjectEpds({
      variables: {
        projectId,
        epdIds: epdData.epds.edges.map((edge: GraphQlEpdEdge) => edge.node.id),
      },
    })
  }

  return (
    <PaperPageStack data-testid='projects-homepage'>
      <RecentProjectsPaper />
      <ProjectsTable
        canCreateProjects={canCreateProjects}
        createButtonToolTip={canCreateProjects ? undefined : 'Call Molio to get project create rights'}
        projectCreationCallback={addEpdsToProject}
      />
    </PaperPageStack>
  )
}
