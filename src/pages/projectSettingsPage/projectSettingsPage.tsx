import React from 'react'
import { Grid } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useGetSingleProjectQuery } from '../../dataAccess'
import { DataFetchWrapper, PaperPage, PaperPageStack } from '@lcacollect/components'
import { BuildingImageUpload, ProjectInformation } from '@lcacollect/project'
import { ProjectSchemaSelection } from '../../components'
import { BuildingInformation } from '../../components/buildingInformation'
import { BuildingEnergyInformation } from '../../components/projectSettings'

export const ProjectSettingsPage = () => {
  const { projectId } = useParams()

  const { data, loading, error } = useGetSingleProjectQuery({
    variables: { id: projectId as string },
    skip: !projectId,
  })

  return (
    <PaperPageStack data-testid='project-settings-page'>
      <PaperPage>
        <DataFetchWrapper loading={loading} error={error}>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6} xl={3}>
              <ProjectInformation
                project={data?.projects[0]}
                selectionDropdown={<ProjectSchemaSelection projectId={projectId || ''} />}
              />
            </Grid>
            <Grid item sm={12} md={6} xl={3}>
              <BuildingInformation projectId={projectId || ''} metaFields={data?.projects[0].metaFields} />
            </Grid>
            <Grid item sm={12} md={6} xl={3}>
              <BuildingEnergyInformation projectId={projectId || ''} metaFields={data?.projects[0].metaFields} />
            </Grid>
            <Grid item sm={12} md={6} xl={3}>
              <BuildingImageUpload />
            </Grid>
          </Grid>
        </DataFetchWrapper>
      </PaperPage>
    </PaperPageStack>
  )
}
