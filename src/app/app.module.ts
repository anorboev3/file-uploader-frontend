import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadPageComponent } from './upload-page/upload-page.component';
import { ViewPageComponent } from './view-page/view-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileTableComponentComponent } from './view-page/file-table-component/file-table-component.component';
import { DataTablesModule } from "angular-datatables";
import { ByteToMbPipe } from './shared/pipes/byte-to-mb.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UploadPageComponent,
    ViewPageComponent,
    SettingsPageComponent,
    MainLayoutComponent,
    FileTableComponentComponent,
    ByteToMbPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
