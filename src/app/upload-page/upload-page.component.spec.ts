import { Settings } from './../shared/interfaces';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPageComponent } from './upload-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('UploadPageComponent', () => {
  let component: UploadPageComponent;
  let fixture: ComponentFixture<UploadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadPageComponent ],
      imports: [ ReactiveFormsModule, HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    component.ngOnInit();
    expect(component.form).toBeTruthy();
  });

  it('should get file', () => {
    let settings: Settings = {  
      fileExtensions: "pdf,docx,xlsx,jpg,png,doc,xls,mp3,mp4,djvu",
      fileSizeInBytes: 5242880,
      fileSizeInMegaBytes: 5
    }
    spyOn(component.settingsService, "getSettings").and.returnValue(of (settings));
    component.ngOnInit();
    let file = new File([""], "asd.pdf");
    let fakeEvent = {
      target: {
        files: [file]
      }
    };
    component.getFile(fakeEvent);
    expect(component.file).toEqual(file);
  });
  
  it('should set true value to notAllowedFileExtension', () => {
    let settings: Settings = {  
      fileExtensions: "docx,xlsx,jpg,png,doc,xls,mp3,mp4,djvu",
      fileSizeInBytes: 5242880,
      fileSizeInMegaBytes: 5
    }
    spyOn(component.settingsService, "getSettings").and.returnValue(of (settings));
    component.ngOnInit();
    let file = new File([""], "asd.pdf");
    let fakeEvent = {
      target: {
        files: [file]
      }
    };
    component.getFile(fakeEvent);

    expect(component.notAllowedFileExtension).toBeTruthy();
  });

  it('should set true value to notAllowedFileSize', () => {
    let settings: Settings = {  
      fileExtensions: "pdf,docx,xlsx,jpg,png,doc,xls,mp3,mp4,djvu",
      fileSizeInBytes: 2,
      fileSizeInMegaBytes: 5
    }
    spyOn(component.settingsService, "getSettings").and.returnValue(of (settings));
    component.ngOnInit();
    let file = new File(["1", "2", "3"], "asd.pdf");
    let fakeEvent = {
      target: {
        files: [file]
      }
    };
    component.getFile(fakeEvent);

    expect(component.notAllowedFileSize).toBeTruthy();
  });

  it('should submit and upload file', () => {
    let settings: Settings = {  
      fileExtensions: "pdf,docx,xlsx,jpg,png,doc,xls,mp3,mp4,djvu",
      fileSizeInBytes: 5242880,
      fileSizeInMegaBytes: 5
    }
    spyOn(component.settingsService, "getSettings").and.returnValue(of (settings));
    component.ngOnInit();
    let file = new File([""], "asd.pdf");
    let fakeEvent = {
      target: {
        files: [file]
      }
    };
    component.getFile(fakeEvent);

    spyOn(component.fileService, "uploadFile").and.returnValue(of (""));
    component.submit();
    expect(component.uploadedSuccessfully).toBeTruthy();
  });
});
