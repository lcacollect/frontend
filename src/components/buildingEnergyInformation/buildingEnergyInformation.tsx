import { CardTitle, InnerPaper } from '@lcacollect/components'
import { Alert, AlertProps, Snackbar, Stack } from '@mui/material'
import React, { useState } from 'react'
import { ProjectMetaFieldInput } from '../metaFieldInput'

export interface InformationCardProps {
  metaFields: { [key: string]: any }
  projectId: string
}

export const BuildingEnergyInformation: React.FC<InformationCardProps> = (props) => {
  const { metaFields, projectId } = props
  const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null)
  const fields = [
    { id: 'heated_area', label: 'Heated Area (m²)', type: 'number' },
    { id: 'heat_usage', label: 'Heat use (kWh/m²/yr)', type: 'number' },
    { id: 'electricity_usage', label: 'Electricity use (kWh/m²/yr)', type: 'number' },
    { id: 'electricity_exported', label: 'Electricity exported to grid (kWh/m²/yr)', type: 'number' },
    {
      id: 'heat_source',
      label: 'Heating source',
      options: [
        'Grid Power - Projection 2020 - 2040',
        'District Heating - Projection 2020 - 2040',
        'Gas - Projection 2020 - 2040',
      ],
    },
    {
      id: 'electricity_source',
      label: 'Electricity source',
      options: ['Grid Power - Projection 2020 - 2040'],
    },
  ]

  return (
    <InnerPaper data-testid='building-energy-information-table'>
      <CardTitle title='Building Energy Use' size='medium' />
      <Stack spacing={2} sx={{ marginTop: 2 }} data-testid='building-energy-info-stack'>
        {fields.map(({ id, label, options, type }, index) => (
          <ProjectMetaFieldInput
            label={label}
            id={id}
            key={index}
            projectId={projectId}
            data={metaFields[id]}
            setError={setSnackbar}
            options={options}
            type={type}
          />
        ))}
      </Stack>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={() => setSnackbar(null)}
          autoHideDuration={6000}
          data-testid='snackbar'
        >
          <Alert {...snackbar} onClose={() => setSnackbar(null)} data-testid='alert' />
        </Snackbar>
      )}
    </InnerPaper>
  )
}
