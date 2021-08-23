import { FileInfoList, FileInfo } from './../../shared/interfaces';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileTableComponentComponent } from './file-table-component.component';
import { FormsModule } from '@angular/forms';
import { ByteToMbPipe } from './../../shared/pipes/byte-to-mb.pipe'

describe('FileTableComponentComponent', () => {
  let component: FileTableComponentComponent;
  let fixture: ComponentFixture<FileTableComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileTableComponentComponent, ByteToMbPipe ],
      imports: [
        FormsModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileTableComponentComponent);
    component = fixture.componentInstance;
    

    var filesList: FileInfo[] = [{
        id: 1,
        fileName: "test",
        fileSize: 1000,
        uploadDate: new Date()
      },{
        id: 2,
        fileName: "test2",
        fileSize: 2000,
        uploadDate: new Date()
      },
    ];

    var groupedFilesList: FileInfoList = {
      fileExtension: 'pdf',
      files: filesList
    }
    
    component.files = groupedFilesList;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
