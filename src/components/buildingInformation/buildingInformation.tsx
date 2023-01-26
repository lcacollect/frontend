import { CardTitle, InnerPaper } from '@lcacollect/components'
import { Alert, AlertProps, Snackbar, Stack } from '@mui/material'
import React, { useState } from 'react'
import { ProjectMetaFieldInput } from '../metaFieldInput'
import { InformationCardProps } from '../buildingEnergyInformation'

export const BuildingInformation: React.FC<InformationCardProps> = (props) => {
  const { metaFields, projectId } = props
  const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null)

  const fields = [
    {
      id: 'building_type',
      label: 'Building Type',
      options: [
        'Office Building',
        'Residential - Detached house',
        'Residential - Multi-story building',
        'Residential - Row-housing',
        'Commercial',
        'Logistic',
        'Production',
        'Hotel',
        'Other',
      ],
    },
    { id: 'gross_area', label: 'Gross Area (m²)', type: 'number' },
    { id: 'construction_type', label: 'Construction Type' },
    { id: 'floors_above_ground', label: 'Floors above ground', type: 'number' },
    { id: 'floors_below_ground', label: 'Floors below ground', type: 'number' },
    { id: 'finished_date', label: 'Construction finished in', type: 'year' },
  ]

  return (
    <InnerPaper data-testid='building-information-table'>
      <CardTitle title='Building Information' size='medium' />
      <Stack spacing={2} sx={{ marginTop: 2 }} data-testid='building-info-stack'>
        {fields.map(({ id, label, type = 'string', options = undefined }, index) => (
          <ProjectMetaFieldInput
            label={label}
            id={id}
            key={index}
            type={type}
            projectId={projectId}
            data={metaFields[id]}
            setError={setSnackbar}
            options={options}
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
          <Alert {...snackbar} onClose={() => setSnackbar(null)} />
        </Snackbar>
      )}
    </InnerPaper>
  )
}
