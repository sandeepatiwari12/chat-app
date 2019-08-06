import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class SignUpService {

    constructor(
        private http: HttpClient
    ) { }

    creareUser(postObj): Observable<any> {
        return this.http.post(environment.API_URL + 'api/user/signup', postObj)
    }
}
