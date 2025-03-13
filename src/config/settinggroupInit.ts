import { SystemSettingGroupdf } from '@/entityTypes/systemsettingType'
export const deepseeklocalgroup = 'Deepseek-local'
export const deepseeklocalurl = 'deepseek-local-url'
export const deepseeklocalmodel = 'deepseek-local-model'
export const deepseekapigroup = 'deepseek-api-group'
export const grokaigroup='grokai-group'
export const grokaiapiurl='grokai-url'
export const grokaiapilkey='grokai-api-key'
export const settinggroupInit: Array<SystemSettingGroupdf> = [
    {
        name: deepseeklocalgroup,
        description: 'deepseek-local-group-description',
        items: [
            {
               key:deepseeklocalurl,
               value:'http://localhost:11434',
               description:'deepseek-local-url-description',
               type:'input',
            },
            {
                key:deepseeklocalmodel,
                value:'deepseek-r1:latest',
                description:'deepseek-local-model-description',
                type:'input',
             }
        ]
    },
    {
        name: deepseekapigroup,
        description: 'deepseek-api-description',
        items: [
            {
               key:'deepseek-api-url',
               value:'http://localhost:11434',
               description:'deepseek-api-description',
               type:'input',
            }
        ]
    },
    {
        name: grokaigroup,
        description: 'grokai-group-description',
        items: [
            {
               key:grokaiapiurl,
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