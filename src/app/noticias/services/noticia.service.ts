import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Noticias} from '../models/noticias';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  private apiUrl = '/noticias/mostrar_noticia';

  constructor(private http: HttpClient) {}

  getNoticias(): Observable<Noticias[]> {
    return this.http.get<Noticias[]>(this.apiUrl);
  }

}
