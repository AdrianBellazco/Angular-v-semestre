import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticiasRoutingModule } from './noticias-routing.module'; //se importa el archivo routing
import {TemplateComponent} from './template/template.component'; //importa el componente
import {provideHttpClient} from '@angular/common/http';
import { CrearNoticiaComponent } from './crear-noticia/crear-noticia.component';


@NgModule({
  declarations: [
    TemplateComponent,
    CrearNoticiaComponent
  ],
  imports: [
    CommonModule,
    NoticiasRoutingModule //se agrega el archivo routing
  ],
  providers: [provideHttpClient() ]
})
export class NoticiasModule { }
