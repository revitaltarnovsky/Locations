import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { FilterPipe } from './_pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserDetailsModalComponent } from './components/user-details-modal/user-details-modal.component';
import { LocationModalComponent } from './components/additional-details/location-modal.component';
import {TabsModule} from 'ngx-bootstrap/tabs'
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FilterPipe,
    UserDetailsModalComponent,
    LocationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    Ng2SearchPipeModule,
    OrderModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    
  ],
  entryComponents: [UserDetailsModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
