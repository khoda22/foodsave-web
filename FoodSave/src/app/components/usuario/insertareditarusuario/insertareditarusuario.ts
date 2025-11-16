import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { Usuario } from '../../../models/Usuario';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Rol } from '../../../models/Rol';
import { RolService } from '../../../services/rol.service';
import {MatSelectModule} from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-insertareditarusuario',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    ],
  templateUrl: './insertareditarusuario.html',
  providers:[provideNativeDateAdapter()],
  styleUrl: './insertareditarusuario.css'
})
export class Insertareditarusuario implements OnInit{
  form:FormGroup = new FormGroup({})
  valorDefecto:boolean=true
  usuario: Usuario = new Usuario()
  id:number=0
  edicion: boolean = false
  listaRoles: Rol[]=[]

  constructor(
    private formBuilder: FormBuilder,
    private uS:UsuarioService,
    private route:ActivatedRoute,
    private router: Router,
    private rS:RolService,
    private snackBar: MatSnackBar,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      this.init()
    })
      this.form = this.formBuilder.group({
      codigo: [0], 
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      foto: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      ubicacion: [0, [Validators.required, Validators.min(0)]],
      login: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      creacion: ['', Validators.required],
      rol: ['', Validators.required],
      estado: [true, Validators.required]
    })
    this.rS.list().subscribe(data=>{
      this.listaRoles = data
    })
  }
  aceptar(){
    if (this.form.valid) {
      this.usuario.idUsuario = this.form.value.codigo,
      this.usuario.username = this.form.value.username,
      this.usuario.email = this.form.value.email,
      this.usuario.password = this.form.value.password,
      this.usuario.foto = this.form.value.foto,
      this.usuario.ubicacion = this.form.value.ubicacion,
      this.usuario.login = this.form.value.login,
      this.usuario.creacion = this.form.value.creacion,
      this.usuario.rol.idRol = this.form.value.rol,
      this.usuario.estado = this.form.value.estado
      if (this.edicion) {
        this.uS.update(this.usuario).subscribe(data=>{
          this.uS.list().subscribe(data=>{
            this.uS.setList(data)
          })
          this.snackBar.open('Se actualizo correctamente', 'Cerrar', {
          duration: 2500
        });
        })
      }
      else{
        this.uS.insert(this.usuario).subscribe(()=>{
            this.uS.list().subscribe(data=>{
              this.uS.setList(data)
            })
            this.snackBar.open('Registro exitoso', 'Cerrar', {
            duration: 2500
        });
          })
      }
      this.router.navigate(['usuarios/listarsinpassword'])
    }
  }
  init(){
    if (this.edicion) {
      this.uS.listId(this.id).subscribe(data=>{
        this.form.patchValue({
          codigo: data.idUsuario,
          username: data.username,
          email: data.email,
          password: data.password,
          foto: data.foto,
          ubicacion: data.ubicacion,
          login: data.login,
          creacion: data.creacion,
          rol: data.rol.idRol,
          estado: data.estado
        })
      })
    }
  }
  cancelar(): void {
    if (this.loginService.verificar()) {
      this.router.navigate(['/usuarios']);
    } else {
      this.router.navigate(['/home']);
    }
  }

}

