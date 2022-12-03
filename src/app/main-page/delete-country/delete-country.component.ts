import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-country',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './delete-country.component.html',
  styleUrls: ['./delete-country.component.scss']
})
export class DeleteCountryComponent {

  constructor(public dialogRef: MatDialogRef<DeleteCountryComponent>){

  }

  delete(){
    this.dialogRef.close(true);
  }
  close(){
    this.dialogRef.close(false);
  }
}
