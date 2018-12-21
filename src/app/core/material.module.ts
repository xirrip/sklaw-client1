import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule, MatTableModule,
  MatToolbarModule,
  MatDialogModule, MatDividerModule
} from '@angular/material';

@NgModule({
  imports: [ CommonModule, MatToolbarModule, MatButtonModule, MatCardModule, MatFormFieldModule,
    MatProgressSpinnerModule, MatInputModule, MatTableModule, MatDialogModule, MatDividerModule
  ],
  exports: [ CommonModule, MatToolbarModule, MatButtonModule, MatCardModule, MatFormFieldModule,
    MatProgressSpinnerModule, MatInputModule, MatTableModule, MatDialogModule, MatDividerModule
  ],
})
export class CustomMaterialModule { }
