import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const appRoutes: Routes = [
    { path: '', redirectTo:'my-calendar', pathMatch:'full' },
    { path: 'my-calendar', loadChildren: './my-calendar/my-calendar.module#MyCalendarModule'},
    { path: 'team-calendar', loadChildren: './team-calendar/team-calendar.module#TeamCalendarModule'},
];


@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}