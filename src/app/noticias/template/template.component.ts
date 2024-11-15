import { Component } from '@angular/core';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrl: './template.component.css'
})
export class TemplateComponent {

  editar(){

  }

  eliminar(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
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

}
