import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listausuariologro } from './listausuariologro/listausuariologro';

@Component({
  selector: 'app-usuariologro',
  imports: [RouterOutlet,Listausuariologro],
  templateUrl: './usuariologro.html',
  styleUrl: './usuariologro.css'
})
export class Usuariologro {
  constructor(public route:ActivatedRoute){}
}
