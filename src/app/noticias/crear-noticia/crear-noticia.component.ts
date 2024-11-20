import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import {Noticias} from '../models/noticias';
import {NoticiaService} from '../services/noticia.service';

@Component({
  selector: 'app-crear-noticia',
  templateUrl: './crear-noticia.component.html',
  styleUrl: './crear-noticia.component.css'
})
export class CrearNoticiaComponent {

  noticia: Noticias = {
    id: 0,
    titulo: '',
    texto: '',
    autor: '',
    imagen: '',
    fecha: '',
    eliminada: false,
    programa: '',
    importancia: '',
    lugar: '',
    diurna: false,
    nocturna: false,
    evento: false,
    noticia: false,
    favorita: false,
  };


  constructor (private noticiaService: NoticiaService) {}

  seleccionar(category: string, event: any): void {
    const isChecked = event.target.checked; // Saber si el checkbox está marcado o desmarcado
    if (isChecked) {
      // Agregar la categoría al string con una barra de separación
      if (!this.noticia.programa.includes(category)) {
        this.noticia.programa += `${category}  `;
      }
    } else {
      // Eliminar la categoría del string si el checkbox se desmarca
      this.noticia.programa = this.noticia.programa.replace(`${category}  `, '');
    }
  }

  subir(){
    Swal.fire({
      title: "Confirmar cambios",
      showDenyButton: true,
      confirmButtonText: "Publicar Noticia",
      confirmButtonColor: '#4CAF50',
      denyButtonText: `Cancelar`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.noticiaService.createNoticia(this.noticia).subscribe(() => {

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Noticia publicada",
            showConfirmButton: false,
            timer: 1500
        })

        });
      } else if (result.isDenied) {
        Swal.fire("Proceso cancelado", "", "info");
      }
    });
  }



}
