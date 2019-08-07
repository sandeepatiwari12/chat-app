import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIService } from '../shared/global.api.settings.service';

@Injectable()
export class SignUpService {

    constructor(
        private http: HttpClient,
        private apiService: APIService
    ) { }

  
}
