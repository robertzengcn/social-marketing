export type ExtraPipModuleItem={
    name:string,
    packagename:string,
    version:string,
    installed:boolean
    description:string
}
export type ExtraPipModule={
    name:string,
    // description:string,
    packagename:string,
    version:string,
    installed?:boolean
}