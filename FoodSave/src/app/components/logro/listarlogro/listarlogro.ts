import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LogroServices } from '../../../services/logro.service';
import { Logro } from '../../../models/Logro';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-listarlogro',
  imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule,MatPaginator,MatPaginatorModule, CommonModule],
  templateUrl: './listarlogro.html',
  styleUrl: './listarlogro.css',
})


export class Listarlogro implements OnInit {
  allColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  publicColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  displayedColumns: string[] = [];

  dataSource: MatTableDataSource<Logro> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoggedIn: boolean = false;
  rolUsuario: string = '';

  constructor(private pS: LogroServices, private loginService: LoginService) {}

  ngOnInit(): void {
    // ✅ Cargar datos de logros
    this.pS.list().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });

    this.pS.getList().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });

    // ----Escuchar ambos estados: login y rol
    this.loginService.loginStatus$.subscribe(status => {
      this.isLoggedIn = status;
      this.actualizarColumnas(); // función que actualiza columnas
    });

    this.loginService.userRol$.subscribe(rol => {
      this.rolUsuario = rol;
      this.actualizarColumnas(); // función que actualiza columnas
    }); //----------------------------------------
  }

  // 🔹 Lógica para mostrar columnas según login y rol
  actualizarColumnas() {
    if (this.isLoggedIn && (this.rolUsuario === 'ADMIN' || this.rolUsuario === 'PROGRAMADOR')) {
      this.displayedColumns = this.allColumns;
    } else {
      this.displayedColumns = this.publicColumns;
    }
  }

  eliminar(id: number) {
    this.pS.deleteP(id).subscribe(() => {
      this.pS.list().subscribe(data => {
        this.pS.setList(data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}