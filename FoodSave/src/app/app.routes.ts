import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Nosotros } from './components/nosotros/nosotros';
import { Login } from './components/login/login';
import { Inicio } from './components/inicio/inicio';
import { Insertareditarusuario } from './components/usuario/insertareditarusuario/insertareditarusuario';
import { Usuario } from './components/usuario/usuario';
import { Usuariologro } from './components/usuariologro/usuariologro';
import { Rol } from './components/rol/rol'; 
import { MiPerfil } from './components/mi-perfil/mi-perfil';  
import { seguridadGuard } from './guard/seguridad.guard';
import { Logro } from './components/logro/logro';
import { Insertareditarlogro } from './components/logro/insertareditarlogro/insertareditarlogro';
import { Producto } from './models/Producto';
import { Insertareditarproducto } from './components/producto/insertareditarproducto/insertareditarproducto';
import { BuscarpornombreComponent } from './components/producto/buscarpornombre/buscarpornombre';
import { Insertareditarrol } from './components/rol/insertareditarrol/insertareditarrol';
import { Listausariossinpassword } from './components/usuario/listausuariosinpassword/listausuariosinpassword';
import { Insertareditarusuariologro } from './components/usuariologro/insertareditarusuariologro/insertareditarusuariologro';
import { Buscar } from './components/producto/buscar/buscar';



export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, //publico es el landing page
  { path: 'home', component: Home }, //publico no necesitas ni estar logueado ni tener algun rol para ingresar
  { path: 'nosotros', component: Nosotros }, //publico no necesitas ni estar logueado ni tener algun rol para ingresar
  { path: 'login', component: Login }, //publico
  { path: 'inicio', component: Inicio, canActivate: [seguridadGuard] }, 
//sin rol pero necesitas loguearte

// === LOGROS ===
  {
    path: 'logros',
    component: Logro, // publico no necesitas ni estar logueado ni tener algun rol para ingresar - listar premios
    children: [
      { path: 'nuevo', component: Insertareditarlogro,
        canActivate: [seguridadGuard],
    data: { roles: ['PROGRAMADOR','ADMIN'] }
       },
      { path: 'ediciones/:id', component: Insertareditarlogro,
        canActivate: [seguridadGuard],
    data: { roles: ['PROGRAMADOR','ADMIN'] }
      }
    ]
  },
// === PRODUCTOS ===
  {
    path: 'productos',
    component: Producto, // ✅ Pública
    children: [
      { path: 'nuevo', component: Insertareditarproducto, canActivate: [seguridadGuard] },
      { path: 'ediciones/:id', component: Insertareditarproducto, canActivate: [seguridadGuard] },
      { path: 'busquedas', component: Buscar }, // ✅ Pública
      { path: 'productopornombre', component: BuscarpornombreComponent, canActivate: [seguridadGuard] } // Pública
    ]
  },

  // === USUARIOS ===
  {
    path: 'usuarios',
    component: Usuario,
    children: [
      { path: 'nuevo', component: Insertareditarusuario },
      { path: 'ediciones/:id', component: Insertareditarusuario },
      { path: 'listarsinpassword', component: Listausariossinpassword }
    ],
    //canActivate: [seguridadGuard],
    //data: { roles: ['PROGRAMADOR','ADMIN'] },
  },

  // === ROLES (solo PROGRAMADOR) ===
  {
    path: 'roles',
    component: Rol,
    children: [
      { path: 'nuevo', component: Insertareditarrol},
      { path: 'ediciones/:id', component: Insertareditarrol}
    ],
    canActivate: [seguridadGuard],
    data: { roles: ['PROGRAMADOR','ADMIN'] },
  },

  // === USUARIO LOGRO ===
  {
    path: 'usuariologros',
    component: Usuariologro,
     canActivate: [seguridadGuard],
    data: { roles: ['PROGRAMADOR','ADMIN','CLIENTE'] },
    children: [
      { path: 'nuevo', component: Insertareditarusuariologro,
         canActivate: [seguridadGuard],
    data: { roles: ['PROGRAMADOR','ADMIN'] }
         },
      { path: 'ediciones/:id', component: Insertareditarusuariologro,
         canActivate: [seguridadGuard],
    data: { roles: ['PROGRAMADOR','ADMIN'] }
       },
    ]
  },

  // MI PERFIL

  {
  path: 'miperfil',
  component: MiPerfil,
  canActivate: [seguridadGuard],
  data: { roles: ['PROGRAMADOR','ADMIN','CLIENTE'] },
}

  ]