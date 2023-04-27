const getProjectStageList = () => {
  const envStageList: string = import.meta.env.VITE_PROJECT_STAGE_LIST
  let stageList: string | string[] = ''

  if (envStageList) {
    try {
      stageList = JSON.parse(envStageList)
    } catch (error) {
      stageList = envStageList.split(',')
    } finally {
      if (Array.isArray(stageList)) {
        stageList = stageList.map((s) => s.trim())
      } else {
        stageList = ''
      }
    }
  }

  return stageList
}

export const Settings = {
  DOMAIN_NAME: import.meta.env.VITE_DOMAIN_NAME || 'collect',
  PROJECT_STAGE_LIST: getProjectStageList() || ['A1-A3', 'B4', 'B6', 'C3', 'C4'],
}
