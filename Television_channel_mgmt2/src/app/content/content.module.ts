import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ContentListComponent } from './content-list/content-list.component';
import { AddContentComponent } from './add-content/add-content.component';


@NgModule({
  declarations: [
    ContentListComponent,
    AddContentComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule
  ]
})
export class ContentModule { }
