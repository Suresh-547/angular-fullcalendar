import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamCalendarComponent } from './team-calendar.component';

const routes: Routes = [
    { path: '', component: TeamCalendarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamCalendarRoutingModule { }
