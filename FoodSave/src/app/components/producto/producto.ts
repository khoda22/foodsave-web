import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listarproducto } from './listarproducto/listarproducto';

@Component({
  selector: 'app-producto',
  imports: [RouterOutlet, Listarproducto],
  templateUrl: './producto.html',
  styleUrl: './producto.css'
})
export class ProductoComponent {
  constructor(public route:ActivatedRoute){}
}

 