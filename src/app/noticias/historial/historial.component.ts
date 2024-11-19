import { Component } from '@angular/core';
import {Noticias} from '../models/noticias';
import {NoticiaService} from '../services/noticia.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent {


  noticias: Noticias[] = [];

  constructor (private noticiaService: NoticiaService) {}

  ngOnInit(): void {
    this.noticiaService.getNoticias().subscribe(
      data => {
        console.log(data);  // Verifica si los datos se están recibiendo correctamente
        this.noticias = data;
      },
      error => {
        console.error('Error al cargar las noticias:', error);
      }
    );
  }

}
