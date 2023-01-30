import React from 'react'
import { Grid } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useGetSingleProjectQuery } from '../../dataAccess'
import { DataFetchWrapper, PaperPage, PaperPageStack } from '@lcacollect/components'
import {
  BuildingImageUpload,
  ProjectInformation,
  ProjectSchemaSelection,
  BuildingInformation,
  BuildingEnergyInformation,
} from '@lcacollect/project'

export const ProjectSettingsPage = () => {
  const { projectId } = useParams()

  const { data, loading, error } = useGetSingleProjectQuery({
    variables: { id: projectId as string },
    skip: !projectId,
  })

  return (
    <PaperPageStack data-testid='project-settings-page'>
      <PaperPage>
        <DataFetchWrapper loading={loading} error={error} data-testid='data-fetch-wrapper'>
          <Grid container spacing={2} data-testid='grid'>
            <Grid item sm={12} md={6} xl={3} data-testid='project-information'>
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
              <BuildingImageUpload data-testid='image-upload' />
            </Grid>
          </Grid>
        </DataFetchWrapper>
      </PaperPage>
    </PaperPageStack>
  )
}
