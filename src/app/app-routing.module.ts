import { SettingsPageComponent } from './settings-page/settings-page.component';
import { UploadPageComponent } from './upload-page/upload-page.component';
import { ViewPageComponent } from './view-page/view-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {
        path: "", 
        redirectTo: "/", 
        pathMatch: "full"
      },
      {
        path: "",
        component: ViewPageComponent
      },
      {
        path: "upload",
        component: UploadPageComponent
      },
      {
        path: "settings",
        component: SettingsPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
