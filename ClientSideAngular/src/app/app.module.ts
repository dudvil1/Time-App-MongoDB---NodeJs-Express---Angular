import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './interceptors/header-inceptor';
import { ApiService } from './services/api.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { AgmCoreModule } from '@agm/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserTimesComponent } from './components/user-times/user-times.component';
import { AdminTimesComponent } from './components/admin-times/admin-times.component';
import { StartExitComponent } from './components/user-times/start-exit/start-exit.component';
import { AllMyShiftsComponent } from './components/user-times/all-my-shifts/all-my-shifts.component';
import { MapboxComponent } from './components/user-times/mapbox/mapbox.component';
import { GraphComponent } from './components/user-times/graph/graph.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    UserTimesComponent,
    AdminTimesComponent,
    StartExitComponent,
    AllMyShiftsComponent,
    MapboxComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD0Xw7vw2nh8xiYzW_y_NtGyXBCKBGOAuQ'
    })
  ],
  providers: [
    DatePipe,
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
