import { Rol } from '../models/Rol';

export class Usuario {
    idUsuario: number = 0;
    username: string = '';
    email: string = '';
    password: string = '';
    foto: String = '';
    ubicacion: String = '';
    login: Date = new Date();
    creacion: Date = new Date();
    rol: Rol = new Rol();
    estado: boolean = false;
}