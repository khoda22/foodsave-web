import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Producto } from '../../../models/Producto';
import { ProductoService } from '../../../services/producto.service';
import { MatPaginator } from '@angular/material/paginator';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarproducto',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatPaginator,
    CommonModule
  ],
  templateUrl: './listarproducto.html',
  styleUrl: './listarproducto.css'
})

export class Listarproducto implements OnInit {
  allColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'];
  publicColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6' ,'c7'];
  displayedColumns: string[] = this.publicColumns;

  dataSource: MatTableDataSource<Producto> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoggedIn: boolean = false;
  rolUsuario: string = '';

  constructor(private productoS: ProductoService, private loginService: LoginService) {}

  ngOnInit(): void {
    // Cargar productos
    this.productoS.list().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });

    this.productoS.getList().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });

    // Escuchar estado de sesión
    this.loginService.loginStatus$.subscribe(status => {
      this.isLoggedIn = status;
      this.verificarAcceso();
    });

    // Escuchar rol de usuario
    this.loginService.userRol$.subscribe(rol => {
      this.rolUsuario = rol;
      this.verificarAcceso();
    });
  }

  verificarAcceso() {
    if (this.isLoggedIn && (this.rolUsuario === 'ADMIN' || this.rolUsuario === 'PROGRAMADOR' ||  this.rolUsuario === 'CLIENTE')) {
      this.displayedColumns = this.allColumns;
    } else {
      this.displayedColumns = this.publicColumns;
    }
  }

  eliminar(id: number) {
    this.productoS.deleteProducto(id).subscribe(() => {
      this.productoS.list().subscribe(data => {
        this.productoS.setList(data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}