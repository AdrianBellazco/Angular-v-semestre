import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticiasRoutingModule } from './noticias-routing.module'; //se importa el archivo routing
import {TemplateComponent} from './template/template.component'; //importa el componente
import {provideHttpClient} from '@angular/common/http'; // extra para la ruta


@NgModule({
  declarations: [
    TemplateComponent
  ],
  imports: [
    CommonModule,
    NoticiasRoutingModule //se agrega el archivo routing
  ],
  providers: [provideHttpClient() ]
})
export class NoticiasModule { }
