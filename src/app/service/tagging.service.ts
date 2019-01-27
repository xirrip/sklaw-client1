import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TagItem} from '../model/tagitem';
import {LawClient} from '../model/lawclient';
import {TagTopic} from '../model/tagTopic';

@Injectable({
  providedIn: 'root'
})
export class TaggingService {

  constructor(private _http: HttpClient) {
  }

  private taggingUrl = 'http://localhost:8082/tags';

  getTopics(): Observable<TagTopic[]> {
    return this._http.get<TagTopic[]>(this.taggingUrl + '/topics');
  }

  getTopic(id: number): Observable<TagTopic> {
    return this._http.get<TagTopic>(this.taggingUrl + '/topics/' + id);
  }

  getLinkedTopics(id: number): Observable<TagTopic[]> {
    return this._http.get<TagTopic[]>(this.taggingUrl + '/topics/' + id + '/links');
  }

  getLinkedItems(id: number): Observable<TagItem[]> {
    return this._http.get<TagItem[]>(this.taggingUrl + '/topics/' + id + '/items');
  }

  createTagItem(tagItem: TagItem): Observable<TagItem> {
    return this._http.post<TagItem>(this.taggingUrl + '/items', tagItem);
  }

  updateTopic(tagTopic: TagTopic): Observable<TagTopic> {
    return this._http.put<TagTopic>(this.taggingUrl + '/topics/' + tagTopic.id, tagTopic);
  }


}
