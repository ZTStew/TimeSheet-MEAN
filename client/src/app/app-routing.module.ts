import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableComponent } from './table/table.component';


const routes: Routes = [
    { path: '', pathMatch: 'full', component: TableComponent},
    
    { path:'**', pathMatch: 'full', redirectTo: "/" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
