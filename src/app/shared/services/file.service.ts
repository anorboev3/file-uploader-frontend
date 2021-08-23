import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileInfoList } from './../interfaces';

@Injectable({
    providedIn: 'root'
})

export class FileService {
    constructor(private http: HttpClient) { }

    getFileInfoList(): Observable<FileInfoList[]> {
        return this.http.get<FileInfoList[]>(`${environment.serverUrl}/file/`);
    }

    uploadFile(file: File): Observable<any> {
        var formData: FormData = new FormData();
        formData.append("file", file);
        return this.http.post(`${environment.serverUrl}/file/upload`, formData);
    }
}