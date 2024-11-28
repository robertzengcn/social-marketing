export type ExtraModuleItem={
    name:string,
    packagename:string,
    packagenameTr?:string,//translate
    version:string,
    installed:boolean
    loading?:boolean
    description:string
}
export type ExtraModule={
    name:string,
    // description:string,
    packagename:string,
    version:string,
    installed?:boolean,
    link:string
}