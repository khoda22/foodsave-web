import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { BuscarPorNombreDTO } from '../../../models/BuscarPorNombreDTO';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-buscarpornombre',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './buscarpornombre.html',
  styleUrls: ['./buscarpornombre.css']
})
export class BuscarpornombreComponent {
  form: FormGroup;
  resultados: BuscarPorNombreDTO[] = [];
  nombreBuscado: string = '';
  sinResultados: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  buscar() {
    if (this.form.valid) {
      const nombre = this.form.value.nombre.trim();
      this.nombreBuscado = nombre;
      this.productoService.buscarpornombre(nombre).subscribe(data => {
        this.resultados = data;
        this.sinResultados = data.length === 0;
      });
    }
  }
}
