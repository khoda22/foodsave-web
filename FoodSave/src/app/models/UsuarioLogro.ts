import { Usuario } from '../models/Usuario';
import { Logro } from '../models/Logro';

export class UsuarioLogro {
    id: number = 0;
    usuario: Usuario = new Usuario();
    fechaLogro: Date = new Date();
    logro: Logro = new Logro();
}