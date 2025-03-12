import {LanguageItem} from "@/entityTypes/commonType"
export type TranslateData={
    text:string
}
export type VideoTranslateData={
    videoId:number
    text:string
}
export interface TransItemsParam<Type>{
    items:Array<Type>
    // source_language:LanguageItem
    target_language:LanguageItem
    translate_tool:string
}