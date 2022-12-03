import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [  {path: '', component:MainPageComponent },
{path: 'ind-country/:index', loadComponent:() =>
  import('./main-page/individual-country/individual-country.component')
  .then(m => m.IndividualCountryComponent)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
