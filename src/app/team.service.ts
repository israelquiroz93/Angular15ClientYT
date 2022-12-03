import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from './models/country.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  
  private path = environment.apiUrl

  constructor(private httpClient: HttpClient) { }

  getTeam(index:number): Observable<Country> {
    const header = new HttpHeaders().set('Content-type', 'application/json');

    return this.httpClient.get<Country>(this.path + 'Team/GetTeamById/'+index, {headers: header, withCredentials: true })
  }

  getAllTeams(): Observable<Country[]> {
    const header = new HttpHeaders().set('Content-type', 'application/json');

    return this.httpClient.get<Country[]>(this.path + 'Team/GetTeams', {headers: header, withCredentials: true })
  }
  
  addCountry(country : Country): any {
    const header = new HttpHeaders().set('Content-type', 'application/json');

    return this.httpClient.post(this.path + "Team/AddTeam", JSON.stringify(country), { headers: header })
  }

  deleteCountry(country: number): any {
    return this.httpClient.delete(this.path + "Team/DeleteTeam/" + country)
  }

  editCountry(country: Country): any {
    const header = new HttpHeaders().set('Content-type', 'application/json');

    return this.httpClient.put(this.path + "Team/EditTeam", JSON.stringify(country), { headers: header })
  }

  
}
