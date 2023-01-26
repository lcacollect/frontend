import { ApolloError } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GetSingleProjectDocument, useUpdateProjectMutation } from '../../dataAccess'
import { AlertProps, Autocomplete, TextField } from '@mui/material'
import { AutoSaveCheckMark } from '@lcacollect/components'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'

interface ProjectMetaFieldInputProps {
  id: string
  label: string
  options?: string[]
  data?: string
  projectId: string
  setError: React.Dispatch<React.SetStateAction<Pick<AlertProps, 'children' | 'severity'> | null>>
  type?: string
}

export const ProjectMetaFieldInput: React.FC<ProjectMetaFieldInputProps> = (props) => {
  const { id, label, data = '', projectId, setError, options, type = 'string' } = props
  const dataTestId = `meta-field-input-${id}`
  const [value, setValue] = React.useState(data || '')
  const [localError, setLocalError] = useState<ApolloError>()
  const [updateProject, { loading }] = useUpdateProjectMutation({
    refetchQueries: [{ query: GetSingleProjectDocument, variables: { id: projectId } }],
  })

  const handleBlur = async () => {
    const { errors } = await updateProject({
      variables: { id: projectId, metaFields: { [id]: value } },
    })

    if (errors) {
      errors.forEach((error) => console.error(error))
      setError({ children: errors[0].message, severity: 'error' })
      setLocalError(errors[0] as unknown as ApolloError)
    } else {
      setError(null)
      setLocalError(undefined)
    }
  }

  useEffect(() => {
    if (type === 'year' && value && value !== data) {
      handleBlur()
    }
  }, [value, type])

  if (options) {
    return (
      <Autocomplete
        id={id}
        disablePortal
        value={value}
        onChange={(e, newValue) => setValue(newValue as string)}
        onBlur={handleBlur}
        options={options}
        renderInput={(params) => (
          <TextField
            data-testid={dataTestId}
            {...params}
            label={label}
            variant='standard'
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  <AutoSaveCheckMark loading={loading} error={localError} />
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    )
  }

  if (type === 'year') {
    return (
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          views={['year']}
          label={label}
          value={value}
          onChange={(e: moment.Moment | null) => {
            setValue(e?.format('YYYY') || '')
          }}
          renderInput={(params) => (
            <TextField
              data-testid={dataTestId}
              id={id}
              variant='standard'
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    <AutoSaveCheckMark loading={loading} error={localError} />
                    {params.InputProps?.endAdornment}
                  </>
                ),
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />
      </LocalizationProvider>
    )
  }
  return (
    <TextField
      data-testid={dataTestId}
      id={id}
      label={label}
      type={type}
      variant='standard'
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      InputProps={{
        endAdornment: <AutoSaveCheckMark loading={loading} error={localError} />,
      }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  )
}
