import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './template/template.component';
import {CrearNoticiaComponent} from './crear-noticia/crear-noticia.component';
import {InicioComponent} from './inicio/inicio.component';
import {OpcionesComponent} from './opciones/opciones.component';
import {HistorialComponent} from './historial/historial.component';
import {FavoritosComponent} from './favoritos/favoritos.component';
import {NoticeTemplateComponent} from './notice-template/notice-template.component';

const routes: Routes = [
  {
    path: '', component: TemplateComponent,
    children:[
      {path: '', redirectTo: 'inicio', pathMatch: 'full'},
      { path: 'inicio', component: InicioComponent,},
      { path: 'crearNoticia', component: CrearNoticiaComponent,},
      { path: 'historial', component: HistorialComponent,},
      { path: 'favoritos', component: FavoritosComponent,},
    ],
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticiasRoutingModule { }
