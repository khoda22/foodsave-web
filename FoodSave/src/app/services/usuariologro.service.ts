import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { UsuarioLogro } from '../models/UsuarioLogro';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class UsuariologroService {
  private url = `${base_url}/usuariologro`;
  private listaCambio = new Subject<UsuarioLogro[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<UsuarioLogro[]>(this.url);
  }
  insert(up:UsuarioLogro) {
    return this.http.post(this.url, up);
  }
  setList(listaNueva:UsuarioLogro[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id:number) {
    return this.http.get<UsuarioLogro>(`${this.url}/${id}`);
  }
  update(up:UsuarioLogro) {
    return this.http.put(this.url, up);
  }
  deleteUP(id:number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
