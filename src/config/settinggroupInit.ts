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
    },
    {
        name: "grokai-group",
        description: 'grokai-group-description',
        items: [
            {
               key:'grokai-url',
               value:'http://localhost:11434',
               description:'grokai-url-description',
               type:'input',
            },
            {
                key:'grokai-api-key',
                value:'',
                description:'grokai-api-key-description',
                type:'input',
             }
        ]
    }
]