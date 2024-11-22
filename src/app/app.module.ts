import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import {provideHttpClient} from '@angular/common/http';
import {NoticiaService} from './noticias/services/noticia.service';
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule
  ],
  exports: [RouterModule],
  providers: [provideHttpClient(), NoticiaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
