import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropComponent } from './drag-drop.component';
import { FileUploadService } from './file-upload.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[DragDropComponent],
  declarations: [DragDropComponent],
  providers:[FileUploadService]
})
export class DragDropModule { }
