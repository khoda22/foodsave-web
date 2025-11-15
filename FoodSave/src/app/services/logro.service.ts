import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Logro } from '../models/Logro';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class LogroServices {
  private url = `${base_url}/logros`;
  private listaCambio = new Subject<Logro[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Logro[]>(this.url);
  }
  insert(p:Logro) {
    return this.http.post(this.url, p);
  }
  setList(listaNueva:Logro[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id:number) {
    return this.http.get<Logro>(`${this.url}/${id}`);
  }
  update(p:Logro) {
    return this.http.put(this.url, p);
  }
  deleteP(id:number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
