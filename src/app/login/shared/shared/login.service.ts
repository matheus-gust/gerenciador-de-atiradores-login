import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../model/login.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    private urlServidor = 'http://127.0.0.1:8080/login';

    constructor(private http: HttpClient) { }

    public efetuarLogin(login: Login) {
        return this.http.post(this.urlServidor, login, {observe: 'response', responseType: 'text'},);
    }
}
