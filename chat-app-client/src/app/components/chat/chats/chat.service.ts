import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { APIService } from '../../shared/global.api.settings.service';

@Injectable()
export class ChatService {

    constructor(
        private http: HttpClient,
        private apiService: APIService
    ) { }

    storeChats(postbody): Observable<any> {
        return this.http.post(this.apiService.getApiUrl() + '/api/chat/store', postbody)
    }
    getAllChats(): Observable<any> {
        return this.http.get(this.apiService.getApiUrl() + '/api/chat/chats')
    }
}
