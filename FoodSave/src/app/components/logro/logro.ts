import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listarlogro } from './listarlogro/listarlogro';

@Component({
  selector: 'app-logro',
  imports: [RouterOutlet,Listarlogro],
  templateUrl: './logro.html',
  styleUrl: './logro.css'
})
export class Logro {
  constructor(public route:ActivatedRoute){}
}
