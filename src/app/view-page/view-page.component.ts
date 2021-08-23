import { FileService } from './../shared/services/file.service';
import { Component, OnInit } from '@angular/core';
import { FileInfoList } from './../shared/interfaces';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.scss']
})
export class ViewPageComponent implements OnInit {
  fileInfoList!: FileInfoList[];

  constructor(public fileService: FileService) { }

  ngOnInit(): void {
    this.fileService.getFileInfoList()
      .subscribe((data: FileInfoList[]) => {
        this.fileInfoList = data;
      }, error => {
        alert(error.error);
      });
  }

}
