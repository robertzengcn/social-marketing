import { ipcRenderer } from 'electron';
import { SearchResult } from './types';
import { VideoPublishRecordEntity } from '@/entity/VideoPublishRecord.entity';
import { CommonDialogMsg } from '@/entityTypes/commonType';

export interface PublishRecordQuery {
  page: number;
  size: number;
  search?: string;
}

export async function getPublishRecords(param: PublishRecordQuery): Promise<SearchResult<VideoPublishRecordEntity>> {
  return await ipcRenderer.invoke('get-publish-records', param);
}

export async function deletePublishRecord(id: number): Promise<boolean> {
  return await ipcRenderer.invoke('delete-publish-record', id);
}

export function receivePublishRecordMessage(cb: (data: CommonDialogMsg) => void) {
  ipcRenderer.on('publish-record-message', (_, data) => {
    cb(data);
  });
} 