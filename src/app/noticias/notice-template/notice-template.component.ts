import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import  {Noticias} from '../models/noticias';
import {NoticiaService} from '../services/noticia.service'

@Component({
  selector: 'app-notice-template',
  templateUrl: './notice-template.component.html',
  styleUrl: './notice-template.component.css'

})
export class NoticeTemplateComponent {

  noticias: Noticias[] = [];

  constructor (private noticiaService: NoticiaService) {}

  ngOnInit(): void {
    this.noticiaService.getNoticias().subscribe(
      data => {
        console.log(data);
        this.noticias = data;
      },
      error => {
        console.error('Error al cargar las noticias:', error);
      }
    );
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
      confirmButtonColor: '#4CAF50',
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


}
