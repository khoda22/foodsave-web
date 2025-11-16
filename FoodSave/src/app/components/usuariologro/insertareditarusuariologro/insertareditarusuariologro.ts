import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { UsuarioLogro } from '../../../models/UsuarioLogro';
import { Usuario } from '../../../models/Usuario';
import { Logro } from '../../../models/Logro';
import { UsuariologroService } from '../../../services/usuariologro.service';
import { UsuarioService } from '../../../services/usuario.service';
import { LogroServices } from '../../../services/logro.service';

@Component({
  selector: 'app-insertareditarusuariologro',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule],
  templateUrl: './insertareditarusuariologro.html',
  providers:[provideNativeDateAdapter()],
  styleUrl: './insertareditarusuariologro.css'
})
export class Insertareditarusuariologro implements OnInit{
  form:FormGroup = new FormGroup({})
  usuariologro: UsuarioLogro = new UsuarioLogro()
  id:number=0
  edicion: boolean=false
  listaLogros: Logro[] = []
  listaUsuarios: Usuario[] = []
  

  constructor(
    private formBuilder: FormBuilder,
    private upS:UsuariologroService,
    private route:ActivatedRoute,
    private router: Router,
    private uS:UsuarioService,
    private pS:LogroServices,
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      this.init()
    })

      this.form = this.formBuilder.group({
      codigo: [0],
      usuario: ['', Validators.required],
      logro: ['', Validators.required],
      fechaLogro: ['', Validators.required] 
      })
    this.uS.list().subscribe(data=>{
      this.listaUsuarios = data
    })
    this.pS.list().subscribe(data=>{
      this.listaLogros = data
    })
  }
  aceptar(){
    if (this.form.valid) {
      this.usuariologro.id = this.form.value.codigo,
      this.usuariologro.logro.id = this.form.value.logro,
      this.usuariologro.usuario.idUsuario = this.form.value.usuario
       const f = this.form.value.fechaLogro;  // Date que viene del DatePicker
    this.usuariologro.fechaLogro = new Date(f.getFullYear(), f.getMonth(), f.getDate());
      if (this.edicion) {
        this.upS.update(this.usuariologro).subscribe(data=>{
          this.upS.list().subscribe(data=>{
            this.upS.setList(data)
          })
        })
      }
      else{
        this.upS.insert(this.usuariologro).subscribe(()=>{
            this.upS.list().subscribe(data=>{
              this.upS.setList(data)
            })
          })
      }
      this.router.navigate(['usuariologro'])
    }
  }
  init() {
  if (this.edicion) {
    this.upS.listId(this.id).subscribe(data => {
        setTimeout(() => {
      this.form.patchValue({
        codigo: data.id,
        logro: data.logro.id,
        usuario: data.usuario.idUsuario,
        fechaLogro: new Date(data.fechaLogro) 
    })
        })
      })
    }
  }
}