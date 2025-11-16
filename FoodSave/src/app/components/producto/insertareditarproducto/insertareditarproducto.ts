import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Producto } from '../../../models/Producto';
import { ProductoService } from '../../../services/producto.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-insertareditarproducto',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    CommonModule
  ],
  templateUrl: './insertareditarproducto.html',
  styleUrl: './insertareditarproducto.css'
})
export class Insertareditarproducto implements OnInit {
  
  form: FormGroup = new FormGroup({});
  producto: Producto = new Producto();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private productoS: ProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      idProducto: [0],
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      vidaUtilDias: ['', Validators.required],
      estado: ['', Validators.required],
      codigoBarra: [''],
      pesoUnitario: ['', Validators.required]
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.producto.idProducto = this.form.value.idProducto;
      this.producto.nombre = this.form.value.nombre;
      this.producto.categoria = this.form.value.categoria;
      this.producto.vidaUtilDias = this.form.value.vidaUtilDias;
      this.producto.estado = this.form.value.estado;
      this.producto.codigoBarra = this.form.value.codigoBarra;
      this.producto.pesoUnitario = this.form.value.pesoUnitario;

      if (this.edicion) {
        this.productoS.update(this.producto).subscribe(() => {
          this.productoS.list().subscribe(data => {
            this.productoS.setList(data);
          });
        });
      } else {
        this.productoS.insert(this.producto).subscribe(() => {
          this.productoS.list().subscribe(data => {
            this.productoS.setList(data);
          });
        });
      }

      this.router.navigate(['productos']);
    }
  }

  init() {
    if (this.edicion) {
      this.productoS.listId(this.id).subscribe(data => {
        this.form.patchValue({
          idProducto: data.idProducto,
          nombre: data.nombre,
          categoria: data.categoria,
          vidaUtilDias: data.vidaUtilDias,
          estado: data.estado,
          codigoBarra: data.codigoBarra,
          pesoUnitario: data.pesoUnitario
        });
      });
    }
  }
}
