import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const appRoutes: Routes = [
    { path: '', redirectTo:'calendar', pathMatch:'full' },
    { path: 'calendar', loadChildren: './calendar/calendar.module#MyCalendarModule'},
];


@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}