import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule, 
    MatDialogModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MatCheckboxModule
     } from '@angular/material';
import { CalendarModule } from 'primeng/primeng';
import { TeamCalendarRoutingModule } from './team-calendar-routing.module';
import { TeamCalendarComponent } from './team-calendar.component';
import { TeamCalendarDialogComponent } from '../team-calendar-dialog/team-calendar-dialog.component';



@NgModule({
    imports: [
        CommonModule,
        TeamCalendarRoutingModule,
        FormsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,   
        MatButtonModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        CalendarModule        
    ],
    declarations: [
        TeamCalendarComponent, 
        TeamCalendarDialogComponent
    ],
    entryComponents: [
        TeamCalendarDialogComponent
    ]
})
export class TeamCalendarModule {
}
