import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Noticias} from '../models/noticias';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  private apiUrl = '/noticias';
  private apiUrl2 = '/noticia';

  constructor(private http: HttpClient) {}

  //listar noticias
  getNoticias(): Observable<Noticias[]> {
    return this.http.get<Noticias[]>(`${this.apiUrl}/mostrar_noticia`);
  }
  //listar historial
  getHistorial(): Observable<Noticias[]> {
    return this.http.get<Noticias[]>(`${this.apiUrl2}/historial`);
  }

  //crear noticia
  createNoticia(noticia: Noticias): Observable<Noticias> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Noticias>(`${this.apiUrl}/crear_noticia`, noticia,{ headers});
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
