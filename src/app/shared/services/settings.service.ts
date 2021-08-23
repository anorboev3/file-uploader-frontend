import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Settings, SettingsForUpdate } from './../interfaces';

@Injectable({
    providedIn: 'root'
})

export class SettingsService {

    constructor(private http: HttpClient){}

    getSettings(): Observable<Settings> {
        return this.http.get<Settings>(`${environment.serverUrl}/settings/`);
    }

    getExtensions(): Observable<string[]> {
        return this.http.get<string[]>(`${environment.serverUrl}/settings/extensions`);
    }

    update(settings: SettingsForUpdate): Observable<any> {
        return this.http.put<SettingsForUpdate>(`${environment.serverUrl}/settings/`, settings);
    }
}
