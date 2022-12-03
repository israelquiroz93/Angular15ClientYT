import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { Country } from '../models/country.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TeamService } from '../team.service';
import { CreateCountryComponent } from './create-country/create-country.component';
import { DeleteCountryComponent } from './delete-country/delete-country.component';

const CountryData: Country[] = [];

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  displayedColumns: string[] = ['countryName', 'confederationName', 'Actions'];
  dataSource = CountryData;
  isEdit: boolean = false

  constructor(private service: TeamService,private route: ActivatedRoute, private _router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.GetAllTeams()
  }

  clickedRow(row:any){
    this._router.navigate(['/ind-country', row.teamId!])
  }

  addCountry(){
    let dialogRef = this.dialog.open(CreateCountryComponent, {
      data: {
        row:{teamId:0, countryName:'', confederationId:0, confederation:{confederationId:0, confederationName:''}},
        isEdit:false
      },
    });

    dialogRef.afterClosed().subscribe((res:any) => {
      if(!null){
        this.service.addCountry(res.data).subscribe({
          next: (x:any)=> {
            this.GetAllTeams()
            console.log('The dialog was closed');
          },
          error: (e:any) => {
            console.warn(e)
          }
        })
      }
      else{
        console.log('The dialog was closed');
      }

    });
  }

  editCountry(row:Country){
    let dialogRef = this.dialog.open(CreateCountryComponent, {
      data: {
        row:row,
        isEdit:true
      },
    });

    dialogRef.afterClosed().subscribe((res:any) => {
      if(res != null){
        this.service.editCountry(res.data).subscribe({
          next: (x:any)=> {
            this.GetAllTeams()
            console.log('The dialog was closed');
          },
          error: (e:any) => {
            console.warn(e)
          }
        })
      }

    });
  }

  deleteCountry(row:Country){
    var teamId = row.teamId
    let dialogRef = this.dialog.open(DeleteCountryComponent, {});

    dialogRef.afterClosed().subscribe((res:any) => {
      if(res == true ){
        this.service.deleteCountry(teamId).subscribe({
          next: (x:any)=> {
            this.GetAllTeams()
            console.log('The dialog was closed');
          },
          error: (e:any) => {
            console.warn(e)
          }
        })
      }
      else{
        console.log('The dialog was closed');
      }

    });
  }

  GetAllTeams(){
    this.service.getAllTeams()
    .subscribe({
      next: (x:Country[]) => {
      this.dataSource = x
    },
      error: (e:any) => {
        console.warn(e)
      }
    })
  }



}
