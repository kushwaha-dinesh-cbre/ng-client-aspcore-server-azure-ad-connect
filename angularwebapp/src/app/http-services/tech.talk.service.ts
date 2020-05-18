import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MsalUserService } from './msal.user.service';
import { TechTalkItem } from '../models/tech-talk-item';



@Injectable({
    providedIn: 'root'
})
export class TechTalkService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient, private msalService: MsalUserService
    ) { }

    getValues(): Observable<string[]> {
        var targetURL = `${environment.apiUrl}api/values`;
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.msalService.GetAccessToken()
            })

        };

        return this.http.get(targetURL, this.httpOptions)
            .pipe((response: any) => {
                return response;
            });
    }

    getTechTalks(): Observable<string[]> {
        var targetURL = `${environment.apiUrl}api/TechTalk`;
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.msalService.GetAccessToken()
            })

        };

        return this.http.get(targetURL, this.httpOptions)
            .pipe((response: any) => {
                return response;
            });
    }

    addTechTalks(techTalkItem: TechTalkItem): Observable<any> {
        var targetURL = `${environment.apiUrl}api/TechTalk`;
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.msalService.GetAccessToken()
            })

        };

        return this.http.post(targetURL, techTalkItem, this.httpOptions)
            .pipe((response: any) => {
                return response;
            });
    }

    getCurrentUserInfo() {
       return this.msalService.getCurrentUserInfo();
    }

    logout() {
        this.msalService.logout();
    }
}    