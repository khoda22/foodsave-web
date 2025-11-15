import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Producto } from '../models/Producto';
import { HttpClient } from '@angular/common/http';
import { BuscarPorNombreDTO } from '../models/BuscarPorNombreDTO';



const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url = `${base_url}/productos`
  private listaCambio=new Subject<Producto[]>

  constructor(private h:HttpClient) { }

  list(){
      return this.h.get<Producto[]>(this.url)
    }

  insert(producto:Producto){
      return this.h.post(this.url,producto)
    }

  getList(){
        return this.listaCambio.asObservable()
      }

  setList(listaNueva:Producto[]){
        this.listaCambio.next(listaNueva)
      }

   listId(id:number){
      return this.h.get<Producto>(`${this.url}/${id}`)
    }

    update(producto:Producto){
      return this.h.put(this.url,producto)
    }

     deleteProducto(id:number){
    return this.h.delete(`${this.url}/${id}`)
  }


   //FILTRO PARA BUSCAR POR PALABRA CLAVE EN LA LISTA DE PRODUCTOS
  searchKeyword(keyword:string){
    //IMPORTANTE PASAR EL NOMBRE TAL CUAL DEL PARAMETRO QUE ESTA EN EL BACKEND
     const params={ keyword }
    return this.h.get<Producto[]>(`${this.url}/buscar`,{params})
  }

  buscarpornombre(nombreProducto:string){
    //IMPORTANTE PASAR EL NOMBRE TAL CUAL DEL PARAMETRO QUE ESTA EN EL BACKEND
     const params={nombreProducto }
    return this.h.get<BuscarPorNombreDTO[]>(`${this.url}/producto_nombre`,{params})
  }


}