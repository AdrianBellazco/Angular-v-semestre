import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticiasRoutingModule } from './noticias-routing.module'; //se importa el archivo routing
import {TemplateComponent} from './template/template.component'; //importa el componente
import {provideHttpClient} from '@angular/common/http';
import { CrearNoticiaComponent } from './crear-noticia/crear-noticia.component';
import { OpcionesComponent } from './opciones/opciones.component';
import { InicioComponent } from './inicio/inicio.component';
import { HistorialComponent } from './historial/historial.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { NoticeTemplateComponent } from './notice-template/notice-template.component';
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    TemplateComponent,
    CrearNoticiaComponent,
    OpcionesComponent,
    InicioComponent,
    HistorialComponent,
    FavoritosComponent,
    NoticeTemplateComponent
  ],
    imports: [
      NgxPaginationModule,
        CommonModule,
        NoticiasRoutingModule,
        FormsModule,

    ],
  providers: [provideHttpClient() ]
})
export class NoticiasModule { }
