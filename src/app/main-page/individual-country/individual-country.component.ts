import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { Country } from 'src/app/models/country.model';
import { Confederation } from 'src/app/models/confederation.model';
import { TeamService } from 'src/app/team.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-individual-country',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './individual-country.component.html',
  styleUrls: ['./individual-country.component.scss']
})
export class IndividualCountryComponent {

  teamObj: Country = new Country(0, "", 0, new Confederation(0, ""));

  constructor(private service: TeamService, private route: ActivatedRoute, private _router: Router){}

  
  ngOnInit(): void {
    this.service.getTeam(Number(this.route.snapshot.paramMap.get('index')!))
    .subscribe({
      next: (x:Country) => {
      this.teamObj = x
    },
      error: (e) => {
        console.warn(e)
      }
    })
  }

  goMainPage(){
    this._router.navigate([''])
  }
}
