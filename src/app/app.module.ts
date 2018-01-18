import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import {CalendarModule} from 'primeng/primeng';
import { MatFormFieldModule,
         MatInputModule,
         MatSelectModule,   
         MatButtonModule,
         MatDialogModule,
         MatDatepickerModule,
         MatNativeDateModule
 
} from '@angular/material';

import {
         AppComponent, 
         DialogDataExampleDialog 
       } from './app.component';

import { FullCalendarModule } from 'ng-fullcalendar';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AppComponent } from './app.component';
import { EventSesrvice } from './event.service';


@NgModule({
  declarations: [
    AppComponent,
    DialogDataExampleDialog
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FullCalendarModule,
    CalendarModule
  ],
  entryComponents: [AppComponent, DialogDataExampleDialog],  
  providers: [ EventSesrvice ],
  bootstrap: [AppComponent]
})
export class AppModule { }
