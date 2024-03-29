import { ProjectSourceType, Unit } from '../../src/dataAccess'

export default {
  data: {
    projectSources: [
      {
        id: '3481d0bb-a0b5-49fa-bdea-27a4253cff0a',
        name: 's2',
        type: ProjectSourceType.Csv,
        dataId: 'path/to/file/016c28e7-6305-40c9-8b2a-aa97f051051a',
        authorId: 'ee98a85a-22ae-475f-9c95-8848bb1b3d5c',
        author: { name: 'My Name', id: 'ee98a85a-22ae-475f-9c95-8848bb1b3d5c' },
        updated: '2022-10-27T09:37:23.272488',
        metaFields: {},
        interpretation: {
          interpretationName: 'Name',
          description: 'Description',
          [Unit.M.toLowerCase()]: 'Unit.M',
          [Unit.M2.toLowerCase()]: 'Unit.M2',
          [Unit.M3.toLowerCase()]: 'Unit.M3',
          [Unit.Kg.toLowerCase()]: 'Unit.Kg',
          [Unit.Pcs.toLowerCase()]: 'Unit.Pcs',
        },
        data: {
          headers: ['Family and Type', 'BIM7AATypeCode', 'BIM7AATypeNumber', 'Area'],
          rows: [
            {
              'Family and Type': 'Basic Wall: 213001 - Skalmur m. mineraluld, 108/26/240, 374 mm',
              BIM7AATypeCode: '213',
              BIM7AATypeNumber: '001',
              Area: 18.90,
              id: 0,
            },
            {
              'Family and Type': 'Basic Wall: 213010 - Skalmur bagside m. mineraluld, 108/26/240, 374 mm',
              BIM7AATypeCode: '213',
              BIM7AATypeNumber: '001',
              Area: 21.70,
              id: 1,
            },
            {
              'Family and Type': 'Basic Wall: 213001 - Skalmur m. mineraluld, 108/26/240, 374 mm',
              BIM7AATypeCode: '213',
              BIM7AATypeNumber: '001',
              Area: 11.84,
              id: 2,
            },
          ],
        },
      },
      {
        id: '40339c01-540f-489d-9ff4-34672039d0e9',
        name: 's5',
        type: ProjectSourceType.Csv,
        dataId: 'path/to/file/43a7b09b-4d0e-41e0-b116-c43b91e3e596',
        authorId: 'ee98a85a-22ae-475f-9c95-8848bb1b3d5c',
        author: { name: 'My Name', id: 'ee98a85a-22ae-475f-9c95-8848bb1b3d5c' },
        updated: '2022-10-27T10:27:09.083359',
        metaFields: {},
        interpretation: {
          interpretationName: 'Family and Type',
          [Unit.M2]: 'Area',
          [Unit.M3]: 'Volume',
          [Unit.Pcs]: 'Count',
        },
        data: {
          headers: ['Count', 'Family and Type', 'Area', 'Volume', 'BIM7AATypeCode', 'BIM7AATypeNumber'],
          rows: [
            {
              Count: 64,
              'Family and Type': 'Floor: 131001 - Terrændæk beton, 100mm',
              Area: 7050.36,
              Volume: 705.04,
              BIM7AATypeCode: '131',
              BIM7AATypeNumber: '001',
              id: 0,
            },
            {
              Count: 65,
              'Family and Type': 'Floor: 131001 - Terrændæk isolering, 400mm',
              Area: 7246.91,
              Volume: 2898.76,
              BIM7AATypeCode: '131',
              BIM7AATypeNumber: '001',
              id: 1,
            },
            {
              Count: 127,
              'Family and Type': 'Floor: 231001 - Huldækelement, beton, 220 mm',
              Area: 19226.34,
              Volume: 4229.79,
              BIM7AATypeCode: '',
              BIM7AATypeNumber: '',
              id: 2,
            },
          ],
        },
      },
      {
        id: '73a84ea1-c0fb-46fd-bb0f-1c73fbd26aee',
        name: 's4',
        type: ProjectSourceType.Csv,
        authorId: 'ee98a85a-22ae-475f-9c95-8848bb1b3d5c',
        dataId: 'ee98a85a-22ae-475f-9c95-8848bb1b3d5c',
        author: { name: 'My Name', id: 'ee98a85a-22ae-475f-9c95-8848bb1b3d5c' },
        updated: '2022-10-27T10:27:19.087338',
        metaFields: {},
        interpretation: {},
        data: {
          headers: ['Count', 'Family and Type', 'Area', 'Volume', 'BIM7AATypeCode', 'BIM7AATypeNumber'],
          rows: [
            {
              Count: 64,
              'Family and Type': 'Floor: 131001 - Terrændæk beton, 100mm',
              Area: 7050.36,
              Volume: 705.04,
              BIM7AATypeCode: '131',
              BIM7AATypeNumber: '001',
              id: 0,
            },
            {
              Count: 65,
              'Family and Type': 'Floor: 131001 - Terrændæk isolering, 400mm',
              Area: 7246.91,
              Volume: 2898.76,
              BIM7AATypeCode: '131',
              BIM7AATypeNumber: '001',
              id: 1,
            },
            {
              Count: 127,
              'Family and Type': 'Floor: 231001 - Huldækelement, beton, 220 mm',
              Area: 19226.34,
              Volume: 4229.79,
              BIM7AATypeCode: '',
              BIM7AATypeNumber: '',
              id: 2,
            },
          ],
        },
      },
    ],
  },
}
