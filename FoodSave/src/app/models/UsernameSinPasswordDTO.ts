import { Rol } from '../models/Rol';
export class UsernameSinPasswordDTO {
    idUsuario: number = 0;
    correo: string = '';
    foto: string = '';
    ubicacion: string = '';
    login: Date = new Date();
    creacion: Date = new Date();

}
