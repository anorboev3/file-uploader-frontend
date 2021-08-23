import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPageComponent } from './view-page.component';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { FileInfo, FileInfoList } from '../shared/interfaces';

describe('ViewPageComponent', () => {
  let component: ViewPageComponent;
  let fixture: ComponentFixture<ViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPageComponent],
      imports: [HttpClientModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value to fileInfoList', () => {
    let files1: FileInfo[] = [
      {
        id: 1,
        fileName: "Test",
        fileSize: 10,
        uploadDate: new Date()
      },
      {
        id: 2,
        fileName: "Test2",
        fileSize: 15,
        uploadDate: new Date()
      }
    ];
    let files2: FileInfo[] = [
      {
        id: 3,
        fileName: "Test3",
        fileSize: 20,
        uploadDate: new Date()
      },
      {
        id: 4,
        fileName: "Test4",
        fileSize: 25,
        uploadDate: new Date()
      }
    ];

    let groupedFiles: FileInfoList[] = [
      {
        fileExtension: "pdf",
        files: files1
      },
      {
        fileExtension: "png",
        files: files2
      }
    ]
    spyOn(component.fileService, "getFileInfoList").and.returnValue(of (groupedFiles));
    component.ngOnInit();
    expect(component.fileInfoList).toBeTruthy();
  });
});
