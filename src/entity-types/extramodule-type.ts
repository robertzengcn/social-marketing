export type ExtraPipModuleItem={
    name:string,
    packagename:string,
    packagenameTr?:string,//translate
    version:string,
    installed:boolean
    loading?:boolean
    description:string
}
export type ExtraPipModule={
    name:string,
    // description:string,
    packagename:string,
    version:string,
    installed?:boolean
}