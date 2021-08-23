import { Settings } from './../shared/interfaces';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { SettingsPageComponent } from './settings-page.component';

describe('SettingsPageComponent', () => {
  let component: SettingsPageComponent;
  let fixture: ComponentFixture<SettingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsPageComponent ],
      imports: [ ReactiveFormsModule, HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value to allowedExtensions and allowedSize', () => {
    let settings: Settings = {  
      fileExtensions: "pdf,docx,xlsx,jpg,png,doc,xls,mp3,mp4,djvu",
      fileSizeInBytes: 5242880,
      fileSizeInMegaBytes: 5
    }
    spyOn(component.settingsService, "getSettings").and.returnValue(of (settings));
    component.ngOnInit();
    expect(component.allowedExtensions).toEqual("pdf,docx,xlsx,jpg,png,doc,xls,mp3,mp4,djvu".split(","));
    expect(component.allowedSize).toEqual(5);
  });

  it('should initialize form', () => {
    let settings: Settings = {  
      fileExtensions: "pdf,docx,xlsx,jpg,png,doc,xls,mp3,mp4,djvu",
      fileSizeInBytes: 5242880,
      fileSizeInMegaBytes: 5
    }
    spyOn(component.settingsService, "getSettings").and.returnValue(of (settings));
    component.ngOnInit();
    expect(component.form).toBeTruthy();
  });
  
  it('should set value to extensions', () => {
    let extensions = ["pdf", "docx", "xlsx", "jpg", "png", "doc", "xls", "mp3", "mp4", "djvu"]
    spyOn(component.settingsService, "getExtensions").and.returnValue(of (extensions));
    component.ngOnInit();
    expect(component.extensions).toEqual(extensions);
  });

  it('should remove given extenson from allowedExtensions array', () => {
    var fakeEvent = {
      target: {
        checked: false
      }
    }
    component.allowedExtensions = ["pdf", "docx", "xlsx", "jpg", "png", "doc", "xls", "mp3", "mp4", "djvu"];
    component.changeAllowedExtentinos(fakeEvent, "pdf");
    expect(component.allowedExtensions).toEqual(["docx", "xlsx", "jpg", "png", "doc", "xls", "mp3", "mp4", "djvu"]);
  });

  it('should add given extenson to allowedExtensions array', () => {
    var fakeEvent = {
      target: {
        checked: true
      }
    }
    component.allowedExtensions = ["docx", "xlsx", "jpg", "png", "doc", "xls", "mp3", "mp4", "djvu"];
    component.changeAllowedExtentinos(fakeEvent, "pdf");
    expect(component.allowedExtensions).toEqual(["docx", "xlsx", "jpg", "png", "doc", "xls", "mp3", "mp4", "djvu", "pdf"]);
  });

  it('should not add given extenson to allowedExtensions array', () => {
    var fakeEvent = {
      target: {
        checked: true
      }
    }
    component.allowedExtensions = ["pdf", "docx", "xlsx", "jpg", "png", "doc", "xls", "mp3", "mp4", "djvu"];
    component.changeAllowedExtentinos(fakeEvent, "pdf");
    expect(component.allowedExtensions).toEqual(["pdf", "docx", "xlsx", "jpg", "png", "doc", "xls", "mp3", "mp4", "djvu"]);
  });

  it('should submit new settings', () => {
    let settings: Settings = {  
      fileExtensions: "pdf,docx,xlsx,jpg,png,doc,xls,mp3,mp4,djvu",
      fileSizeInBytes: 5242880,
      fileSizeInMegaBytes: 5
    }
    spyOn(component.settingsService, "getSettings").and.returnValue(of (settings));
    component.ngOnInit();

    spyOn(component.settingsService, "update").and.returnValue(of (""));
    component.submit();

    expect(component.updatedSuccessfullyMessage).toBeTruthy();
  });

  it('should set true value to sizeLessThenOneError', () => {
    let settings: Settings = {  
      fileExtensions: "pdf,docx,xlsx,jpg,png,doc,xls,mp3,mp4,djvu",
      fileSizeInBytes: 0,
      fileSizeInMegaBytes: 0
    }
    spyOn(component.settingsService, "getSettings").and.returnValue(of (settings));
    component.ngOnInit();

    spyOn(component.settingsService, "update").and.returnValue(of (""));
    component.submit();

    expect(component.sizeLessThenOneError).toBeTruthy();
  });

  it('should set true value to sizeLessThenOneError', () => {
    let settings: Settings = {  
      fileExtensions: "pdf,docx,xlsx,jpg,png,doc,xls,mp3,mp4,djvu",
      fileSizeInBytes: 5242880,
      fileSizeInMegaBytes: 5
    }
    spyOn(component.settingsService, "getSettings").and.returnValue(of (settings));
    component.ngOnInit();
    component.allowedExtensions = [];
    spyOn(component.settingsService, "update").and.returnValue(of (""));
    component.submit();

    expect(component.extensionsNotSelectedError).toBeTruthy();
  });
});
