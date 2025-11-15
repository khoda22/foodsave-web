import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Logro} from '../../../models/Logro';
import { LogroServices } from '../../../services/logro.service';

@Component({
  selector: 'app-insertareditarlogro',
  imports: [MatInputModule,
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule],
  templateUrl: './insertareditarlogro.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './insertareditarlogro.css'
})
export class Insertareditarlogro implements OnInit {
  form: FormGroup = new FormGroup({});
  logro: Logro = new Logro();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private pS: LogroServices,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: [0],
      categoria: ['', Validators.required],
      nombrePrem: ['', Validators.required],
      puntos: ['', Validators.required],
    });
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      this.init()
    })
  }
  aceptar(){
    if (this.form.valid) {
      this.logro.id = this.form.value.codigo
      this.logro.nombreLogro = this.form.value.nombreLogro
      this.logro.descripcionLogro = this.form.value.descripcionLogro
      this.logro.puntosLogro = this.form.value.puntosLogro
      
      if (this.edicion) {
        this.pS.update(this.logro).subscribe(data=>{
          this.pS.list().subscribe(data=>{
            this.pS.setList(data)
          })
        })
      }
      else{
        this.pS.insert(this.logro).subscribe(()=>{
            this.pS.list().subscribe(data=>{
              this.pS.setList(data)
            })
          })
      }
      this.router.navigate(['premios'])
    }
  }
  /*init(){
    if (this.edicion) {
      this.pS.listId(this.id).subscribe(data=>{
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          categoria: new FormControl(data.categoria),
          nombrePrem: new FormControl(data.nombrePrem),
          puntos: new FormControl(data.puntos)
        })
      })
    }
  }*/
  init(){
    if (this.edicion) {
      this.pS.listId(this.id).subscribe(data=>{
        this.form.patchValue({
          codigo: data.id,
          nombreLogro: data.nombreLogro,
          descripcionLogro: data.descripcionLogro,
          puntosLogro: data.puntosLogro,
        })
      })
    }
  }
}