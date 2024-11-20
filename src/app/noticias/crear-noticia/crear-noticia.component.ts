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
