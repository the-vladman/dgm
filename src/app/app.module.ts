import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { DgmLandingSearchComponent } from './components/dgm-landing-search/dgm-landing-search.component';
import { DgmDatasetsBannerComponent } from './components/dgm-datasets-banner/dgm-datasets-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    DgmLandingSearchComponent,
    DgmDatasetsBannerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
