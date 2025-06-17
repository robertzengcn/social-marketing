//import { ipcRenderer } from 'electron';
import { SearchResult } from './types';
import { VideoPublishRecordEntity } from '@/entity/VideoPublishRecord.entity';
import { CommonDialogMsg } from '@/entityTypes/commonType';
import {windowReceive,windowInvoke} from '@/views/utils/apirequest'

export interface PublishRecordQuery {
  page: number;
  size: number;
  search?: string;
}

export async function getPublishRecords(param: PublishRecordQuery): Promise<SearchResult<VideoPublishRecordEntity>> {
  return await windowInvoke('get-publish-records', param);
}

export async function deletePublishRecord(id: number): Promise<boolean> {
  return await windowInvoke('delete-publish-record', {id});
}

export function receivePublishRecordMessage(cb: (data: CommonDialogMsg) => void) {

  windowReceive('publish-record-message',cb)
} 