import { SettingsService } from './../shared/services/settings.service';
import { FileService } from './../shared/services/file.service';
import { Settings } from './../shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.scss']
})
export class UploadPageComponent implements OnInit {
  form!: FormGroup;
  settings!: Settings;
  file!: File;
  notAllowedFileExtension: boolean = false;
  notAllowedFileSize: boolean = false;
  fileExtension: string = "";
  uploadedSuccessfully: boolean = false;

  constructor(public fileService: FileService, public settingsService: SettingsService) {  }

  ngOnInit(): void {
    this.settingsService.getSettings()
      .subscribe((data: Settings) => {
        this.settings = data;
      });
    this.form = new FormGroup({
      file: new FormControl(null, [
        Validators.required
      ])
    });
  }

  submit() {
    this.fileService.uploadFile(this.file)
      .subscribe(() => {
        this.uploadedSuccessfully = true;
        this.form.reset();
      }, error => {
        alert(error.error);
      });
  }

  getFile(event: any) {
    this.notAllowedFileExtension = false;
    this.notAllowedFileSize = false;
    this.uploadedSuccessfully = false;
    let file = event.target.files[0];
    
    this.fileExtension = file.name.split('.').pop(); 
    if(!this.settings.fileExtensions.includes(this.fileExtension)){
      this.notAllowedFileExtension = true;
      return;
    }

    if(file.size > this.settings.fileSizeInBytes){
      this.notAllowedFileSize = true;
      return;
    }

    this.file = file;
  }
}
