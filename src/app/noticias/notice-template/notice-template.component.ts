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





  async editar(noticias: Noticias): Promise<void> {
    const {value: formValues} = await Swal.fire({
      title: "Editar noticia",
      html: `
    <input id="id" class="swal2-input" placeholder="Id" disabled value ="${noticias.id}">
    <input id="titulo" class="swal2-input" placeholder="Titulo de noticia"  value ="${noticias.titulo}">
    <textarea id="texto" class="swal2-textarea" placeholder="Detalles"
     style="width: 90%; height: 150px; resize: none; margin-bottom: 20px; display: block;">${noticias.texto}</textarea>
     <input id="swal-file" type="file" accept="image/*" class="swal2-input" style="display:block; margin: auto;">
  `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: '#4CAF50',
      confirmButtonText: 'Guardar cambios',
      preConfirm: () => {
        const id = (<HTMLInputElement>Swal.getPopup()!.querySelector('#id')).value;
        const titulo = (<HTMLInputElement>Swal.getPopup()!.querySelector('#titulo')).value;
        const texto = (<HTMLInputElement>Swal.getPopup()!.querySelector('#texto')).value;
        return {id, titulo, texto};
      }
    });
    if (formValues) {
      Swal.fire({
        confirmButtonColor: '#4CAF50',
        title: "¿Quieres guardar los cambios?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Guardar cambios",
        denyButtonText: `No guardar`
      }).then((result) => {
        if (result.isConfirmed) {
          // Usa formValues directamente porque ahora es un objeto con las propiedades correctas
          noticias.titulo = formValues.titulo;
          noticias.texto = formValues.texto;
          noticias.programa = formValues.programa;
          this.noticiaService.updateNoticia(noticias).subscribe(() => {
            Swal.fire("Guardados!", "", "success");
          });
        } else if (result.isDenied) {
          Swal.fire("Los cambios no se guardaron", "", "info");
        }
      });
    }
  }

  eliminar(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4CAF50',
      cancelButtonColor: '#c94646',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.noticiaService.deleteNotice(id).subscribe(() => {
          this.cargarNoticias();
          Swal.fire('¡Eliminado!', 'la noticia ha sido eliminado.', 'success');

        });

      }
    });
  }

  private cargarNoticias(){
this.noticiaService.getNoticias().subscribe(data => this.noticias = data);
  }




}
