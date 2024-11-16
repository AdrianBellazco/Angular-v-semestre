import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './template/template.component';
import {CrearNoticiaComponent} from './crear-noticia/crear-noticia.component';

const routes: Routes = [
  {
    path: '', component: TemplateComponent,
    children:[
      { path: 'crearNoticia', component: CrearNoticiaComponent,},

    ],

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticiasRoutingModule { }
