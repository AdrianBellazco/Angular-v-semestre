import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Noticias} from '../models/noticias';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  private apiUrl = '/noticias';

  constructor(private http: HttpClient) {}

  getNoticias(): Observable<Noticias[]> {
    return this.http.get<Noticias[]>(`${this.apiUrl}/mostrar_noticia`);
  }

  //crear noticia
  createNoticia(noticia: Noticias): Observable<Noticias> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<Noticias>(`${this.apiUrl}/crear_noticia`, noticia,{ headers});
  }

  //eliminar noticia
  deleteNotice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar_noticia/${id}`);
  }

  //actualizar
  updateNoticia(noticia: Noticias): Observable<Noticias> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<Noticias>(`${this.apiUrl}/modificar_noticia/${noticia.id}`, noticia,{ headers});

  }


}
