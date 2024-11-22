import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import {Noticias} from '../models/noticias';
import {NoticiaService} from '../services/noticia.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent {

  public p!: number;

  noticias: Noticias[] = [];

  constructor (private noticiaService: NoticiaService) {}

  ngOnInit(): void {
    this.noticiaService.getFavoritos().subscribe(
      data => {
        console.log(data);  // Verifica si los datos se están recibiendo correctamente
        this.noticias = data;
      },
      error => {
        console.error('Error al cargar las noticias:', error);
      }
    );
  }

  favorita(noticia: Noticias): void {
    // Verificamos si 'favorita' existe en la noticia
    if (noticia) {
      // Cambiar el valor de 'favorita' (alternarlo entre true y false)
      noticia.favorita = !noticia.favorita;

      // Si se cambia a true, se hace un mensaje de agregado, si es false, de eliminado
      const mensaje = noticia.favorita ? 'Agregada a favoritas' : 'Eliminada de favoritas';


      // Hacer la llamada al servicio solo si es necesario
      this.noticiaService.favorita(noticia).subscribe(
        () => {
          // Después de la respuesta del servidor, mostramos un Toast
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          this.cargarNoticias();
          Toast.fire({

            icon: "success",
            title: mensaje
          });
        },
        (error) => {
          // Si ocurre un error con el servicio, podemos revertir el cambio
          noticia.favorita = !noticia.favorita;  // Revertir el cambio
          alert('Hubo un error al intentar actualizar el estado de favorito');
        }
      );
    }
  }



  async editar() {
    const {value: formValues} = await Swal.fire({
      title: "editar noticia",
      html: `
    <input id="swal-input1" class="swal2-input" placeholder="Id">
    <input id="swal-input2" class="swal2-input" placeholder="Titulo de noticia">
    <textarea id="swal-textarea" class="swal2-textarea" placeholder="Detalles"></textarea>
     <input id="swal-file" type="file" accept="image/*" class="swal2-input" style="display:block; margin: auto;">
  `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: '#4CAF50',
      confirmButtonText: 'Guardar cambios',


      preConfirm: () => {
        return [];
      }
    });
    if (formValues) {
      Swal.fire({
        confirmButtonColor: '#4CAF50',
        title: "Quieres jugardar los cambios?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Guardar cambios",
        denyButtonText: `No guardar`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Guardados!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Los cambios no se guardaron", "", "info");
        }
      });
    }
  }

  eliminar(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",

      },
      buttonsStyling: false

    });
    swalWithBootstrapButtons.fire({
      title: "Estas seguro",
      text: "Tu quieres borrar la noticia",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, quiero borrarla!",
      cancelButtonText: "No, cancela!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Borrada!",
          text: "Tu noticia ha sido borrada.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelada.",
          text: "No se borro la noticia.",
          icon: "error"
        });
      }
    });
  }

  private cargarNoticias(){
    this.noticiaService.getFavoritos().subscribe(data => this.noticias = data);
  }


}
