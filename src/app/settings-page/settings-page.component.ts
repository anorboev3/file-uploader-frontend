import { SettingsService } from './../shared/services/settings.service';
import { Component, OnInit } from '@angular/core';
import { Settings, SettingsForUpdate } from './../shared/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {
  form!: FormGroup;
  allowedExtensions!: string[];
  allowedSize!: number;
  extensions!: string[];
  sizeLessThenOneError: boolean = false;
  extensionsNotSelectedError: boolean = false;
  updatedSuccessfullyMessage: boolean = false;
  constructor(public settingsService: SettingsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.settingsService.getSettings()
      .subscribe((data: Settings) => {
        this.allowedExtensions = data.fileExtensions.split(",");
        this.allowedSize = data.fileSizeInMegaBytes;
        this.form = this.fb.group({
          size: [
            data.fileSizeInMegaBytes, [
              Validators.required
            ]
          ]
        });
      }, error => {
        alert(error.error);
      });

    this.settingsService.getExtensions()
      .subscribe((data: string[]) => {
        this.extensions = data;
      }, error => {
        alert(error.error);
      });
  }

  changeAllowedExtentinos(event: any, extension: string) {
    if (event.target.checked && !this.allowedExtensions.includes(extension)) {
      this.allowedExtensions.push(extension)
    }
    if (!event.target.checked && this.allowedExtensions.includes(extension)) {
      this.allowedExtensions = this.allowedExtensions.filter(x => x != extension)
    }
  }

  submit() {
    this.sizeLessThenOneError = false;
    this.extensionsNotSelectedError = false;
    this.updatedSuccessfullyMessage = false;
    if(this.form.get("size")?.value < 1)
    {
      this.sizeLessThenOneError = true;
      return;
    }
    if(this.allowedExtensions.length == 0)
    {
      this.extensionsNotSelectedError = true;
      return;
    }
    let newSettings: SettingsForUpdate = {
      fileExtensions: this.allowedExtensions.toString(),
      fileSize: this.form.get("size")?.value
    }
    this.settingsService.update(newSettings)
      .subscribe(() => {
        this.updatedSuccessfullyMessage = true;
      })
  }
}
