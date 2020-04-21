import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const modules = [
  MaterialModule,
  FormsModule,
  ReactiveFormsModule,
]

@NgModule({
  declarations: [],
  imports: [ ...modules ],
  exports: [ ...modules ],
})
export class SharedModule { }
