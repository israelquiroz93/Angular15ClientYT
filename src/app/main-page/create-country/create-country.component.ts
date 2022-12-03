import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Country } from 'src/app/models/country.model';
import { Confederation } from 'src/app/models/confederation.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-country',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './create-country.component.html',
  styleUrls: ['./create-country.component.scss']
})
export class CreateCountryComponent {

  countryObj:Country | undefined
  isEdit:boolean = false

  countryForm = new FormGroup({
    countryName: new FormControl(''),
    selectFormControl: new FormControl(0)
  })

  confeds: Confederation[] = [
    {confederationId: 1, confederationName: 'Concacaf'},
    {confederationId: 2, confederationName: 'UEFA'},
    {confederationId: 3, confederationName: 'Conmebol'},
    {confederationId: 4, confederationName: 'AFC'},
    {confederationId: 5, confederationName: 'CAF'},
    {confederationId: 6, confederationName: 'OFC'}
  ];

  constructor(private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<CreateCountryComponent>) {
    this.countryObj = data.row
    this.isEdit = data.isEdit
  }

  ngOnInit(): void {
    if(this.isEdit){
      this.countryForm = this._formBuilder.group({
        countryName: [this.countryObj!.countryName],
        selectFormControl: [this.countryObj!.confederationId]
      });
    }
    else{
      this.countryForm = this._formBuilder.group({
        countryName: [""],
        selectFormControl: [0]
      });
    }
  }

  onSubmit(){
    if(this.countryForm.valid){
      this.data.row.countryName = this.countryForm.controls.countryName.value
      this.data.row.confederationId = this.countryForm.controls.selectFormControl.value
      this.dialogRef.close({data: this.data.row, isEdit:this.isEdit});
    }
    else{
      console.warn("error")
    }

  }

  cancel(){
    this.dialogRef.close(null);
  }

}
