import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Producto } from '../../../models/Producto';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-buscar',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule
  ],
  templateUrl: './buscar.html',
  styleUrl: './buscar.css'
})
export class Buscar  implements OnInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5','c6', 'c7'];
  dataSource:MatTableDataSource<Producto>=new MatTableDataSource()
  form:FormGroup;
  notResults:boolean=false
  keywordBusqueda:string=""
  constructor(private productoS:ProductoService, private fb:FormBuilder){
    this.form=fb.group({
      keyword:['']
    })
  }

  ngOnInit(): void {

    this.productoS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })
      this.form.get('keyword')?.valueChanges.subscribe(value=>{
        this.keywordBusqueda =  value
        this.buscar()
      })
    }

    buscar(){
      if(this.keywordBusqueda != ""){
        this.productoS.searchKeyword(this.keywordBusqueda).subscribe(data =>{
          this.dataSource=new MatTableDataSource(data)
          this.notResults= data.length===0
        })

      } else {
    this.productoS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
      this.notResults=false
      })
      }

    }


}


