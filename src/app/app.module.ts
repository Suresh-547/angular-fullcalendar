import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyCalendarEvent } from './shared/services/my-calendar.service';
import { MyTeamCalendarEvent } from './shared/services/team-calendar.service';


@NgModule({
  declarations: [
    AppComponent 
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  entryComponents: [AppComponent],  
  providers: [ MyCalendarEvent, MyTeamCalendarEvent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
