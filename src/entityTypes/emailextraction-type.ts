import { ProxyEntity } from '@/entityTypes/proxyType'
import {EmailExtractionTypes} from "@/config/emailextraction"
export type EmailscFormdata = {
  extratype: string,
  urls?: Array<string>,
  searchTaskId?: number,
  concurrency: number,
  pagelength: number,
  notShowBrowser: boolean,
  proxys?: Array<ProxyEntity>,
  // maxConcurrent: number,
}
export type EmailClusterdata = {
  url: string,
  proxy?: string,
  domain: string,
  maxPageLevel: number,
  visited?: Set<string>,
  //filterEmail?: Set<string>,
  callback?: (arg: EmailResult) => void
}
export type EmailDatascraper = {
  urls: Array<string>,
  callback?: (arg: EmailResult) => void
}
export type EmailSearchData = {
  urls: Array<string>,
  proxys?: Array<ProxyEntity>,
  pageLevel: number,
  notShowBrowser: boolean
  concurrency: number,
  // callback?: (arg: EmailResult) => void
}
export type EmailResult = {
  url: string,
  pageTitle: string,
  filteredLinks: Array<string>,
  emails: Array<string>
}
export type EmailResultDisplay = {
  url: string,
  pageTitle: string,
  emails: Array<string>,
  recordTime: string
}
export type EmailsControldata = {
  validUrls: Array<string>,
  concurrency: number,
  pagelength: number,
  notShowBrowser: boolean,
  proxys?: Array<ProxyEntity>,
  type: EmailExtractionTypes,
  // maxConcurrent: number,
}

export type EmailSearchResult = {
url:string,
email:Array<string>,
title:string,
}
export type SearchTaskItemdisplay = {
  id: number,
  type: string,    
  status: string,
  urls:Array<string>,
  email:Array<string>,
}
export interface EmailsearchTaskEntityDisplay {
  id: number,
  record_time?:string,
  typeName: string,
  statusName: string,
  urls:Array<string>,
  //urlString?:string,
}
export type EmailsearchTaskquery={
  taskId:number
}