import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit.component';
import { EditRoutingModule } from './edit-routing.module';

@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EditRoutingModule
  ],
  exports: [
    EditComponent
  ]
})
export class EditModule { }
