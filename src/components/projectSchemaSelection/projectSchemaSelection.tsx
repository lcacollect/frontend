import { DataFetchWrapper, AutoSaveCheckMark } from '@lcacollect/components'
import { Alert, AlertProps, Autocomplete, Snackbar, TextField } from '@mui/material'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import {
  GetProjectSchemasDocument,
  GraphQlSchemaTemplate,
  useAddReportingSchemaFromTemplateMutation,
  useGetProjectSchemasQuery,
  useGetSchemaTemplatesQuery,
} from '../../dataAccess'
import { ApolloError } from '@apollo/client'

interface ProjectSchemaSelectionProps {
  projectId: string
}

export const ProjectSchemaSelection = (props: ProjectSchemaSelectionProps) => {
  const { projectId } = props

  const [isSchemaAdded, setIsSchemaAdded] = useState(false)
  const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null)
  const [addReportingSchema, { loading }] = useAddReportingSchemaFromTemplateMutation({
    refetchQueries: [{ query: GetProjectSchemasDocument, variables: { projectId: projectId } }],
  })
  const {
    data: schemaTemplateData,
    loading: schemaTemplateLoading,
    error: schemaTemplateError,
  } = useGetSchemaTemplatesQuery()

  const {
    data: projectSchemaData,
    loading: projectSchemaLoading,
    error: projectSchemaError,
  } = useGetProjectSchemasQuery({
    variables: {
      projectId,
    },
    skip: !projectId,
  })

  useEffect(() => {
    console.log('schematemplates; data, loading, error', schemaTemplateData, schemaTemplateLoading, schemaTemplateError)
    console.log(
      'useGetProjectSchemasQuery; data, loading, error',
      projectSchemaData,
      projectSchemaLoading,
      projectSchemaError,
    )
  }, [])

  const handleSchemaChange = async (event: SyntheticEvent, template: GraphQlSchemaTemplate | null | undefined) => {
    if (!template) {
      return null
    }

    if (isSchemaAdded) {
      console.log('Reporting schema already exists, returning')
      return null
    }

    const { errors, data } = await addReportingSchema({
      variables: { projectId, name: template.schema?.name, templateId: template.id },
    })

    if (errors) {
      setSnackbar({ children: `${errors[0].message}`, severity: 'error' })
    }

    if (data?.addReportingSchemaFromTemplate.id) {
      setIsSchemaAdded(true)
    }

    return null
  }
  return (
    <DataFetchWrapper
      error={schemaTemplateError || projectSchemaError}
      loading={schemaTemplateLoading || projectSchemaLoading}
    >
      <Autocomplete
        data-testid='auto-complete'
        aria-label='reporting-schema-selector'
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onChange={(event, template) => handleSchemaChange(event, template)}
        disablePortal
        id='reporting-schemas'
        getOptionLabel={(option) => option.name}
        value={projectSchemaData?.reportingSchemas[0] as GraphQlSchemaTemplate}
        options={schemaTemplateData?.schemaTemplates || []}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        renderInput={(params) => (
          <TextField
            data-testid='text-field'
            {...params}
            label='Reporting Schema'
            variant='standard'
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  <AutoSaveCheckMark loading={loading} error={snackbar ? new ApolloError({}) : undefined} />
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={() => setSnackbar(null)}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={() => setSnackbar(null)} />
        </Snackbar>
      )}
    </DataFetchWrapper>
  )
}
