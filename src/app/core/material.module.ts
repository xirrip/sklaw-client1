import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule, MatTableModule,
  MatToolbarModule,
  MatDialogModule, MatDividerModule, MatRadioModule, MatOptionModule, MatAutocompleteModule, MatSelectModule
} from '@angular/material';

@NgModule({
  imports: [ CommonModule, MatToolbarModule, MatButtonModule, MatCardModule, MatFormFieldModule,
    MatProgressSpinnerModule, MatInputModule, MatTableModule, MatDialogModule, MatDividerModule,
    MatRadioModule, MatOptionModule, MatAutocompleteModule, MatSelectModule
  ],
  exports: [ CommonModule, MatToolbarModule, MatButtonModule, MatCardModule, MatFormFieldModule,
    MatProgressSpinnerModule, MatInputModule, MatTableModule, MatDialogModule, MatDividerModule,
    MatRadioModule, MatOptionModule, MatAutocompleteModule, MatSelectModule
  ],
})
export class CustomMaterialModule { }
