import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIService } from '../shared/global.api.settings.service';

@Injectable()
export class LoginService {

    constructor(
        private http: HttpClient,
        private apiService: APIService
    ) { }

    creareUser(postObj): Observable<any> {
        return this.http.post(this.apiService.getApiUrl() + '/api/user/signup', postObj)
    }
    login(postObj): Observable<any> {
        return this.http.post(this.apiService.getApiUrl() + '/api/user/login', postObj)
    }
    updateUser(postObj): Observable<any> {
        return this.http.post(this.apiService.getApiUrl() + '/api/user/update/' + postObj.id, postObj)
    }
}
