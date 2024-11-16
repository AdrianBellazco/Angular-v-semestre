import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-noticia',
  templateUrl: './crear-noticia.component.html',
  styleUrl: './crear-noticia.component.css'
})
export class CrearNoticiaComponent {

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
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Noticia publicada",
          showConfirmButton: false,
          timer: 1500
        });
      } else if (result.isDenied) {
        Swal.fire("Proceso cancelado", "", "info");
      }
    });
  }

}
