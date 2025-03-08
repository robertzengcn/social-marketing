import { SystemSettingGroupdf } from '@/entityTypes/systemsettingType'
export const deepseeklocalgroup = 'Deepseek-local'
export const settinggroupInit: Array<SystemSettingGroupdf> = [
    {
        name: deepseeklocalgroup,
        description: 'deepseek-local-group-description',
        items: [
            {
               key:'deepseek-local-url',
               value:'http://localhost:11434',
               description:'deepseek-local-url-description',
               type:'input',
            }
        ]
    }
]