import { FileInfoList } from '../../shared/interfaces';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-file-table-component',
  templateUrl: './file-table-component.component.html',
  styleUrls: ['./file-table-component.component.scss']
})
export class FileTableComponentComponent {
  @Input() files!: FileInfoList;
  downloadLink: string = `${environment.serverUrl}/file/download/`
  constructor() { }

}
