import { Settings as SettingsInterface } from '@lcacollect/core'

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

export const Settings: SettingsInterface = {
  domainName: import.meta.env.VITE_DOMAIN_NAME || null,
  projectStageList: getProjectStageList() || null,
}
