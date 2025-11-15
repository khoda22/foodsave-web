import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatCardModule,
    MatIconModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  // Lista de pasos para la sección “Cómo empezar”
  pasos: string[] = [
    'Regístrate o inicia sesión con tu cuenta de FOODSAVE.',
    'Elige tu rol y completa tu perfil',
    'Selecciona tus preferencias alimenticias, recibe sugerencias de la IA.',
    'Visualiza tu lista de alimentos, ordena por tipo o fecha de vencimiento y mantén tu despensa bajo control.',
    'Evalúa y reporta para mejorar la comunidad.'
  ];

  // Lista de características para la sección “¿Por qué usar FOODSAVE?”
  caracteristicas: string[] = [
    'Conexión fácil e interfaz cómodamente para todos.',
    'Chat integrado con IA para dudas frecuentes.',
    'Visualiza estadísticas sobre tus hábitos de consumo.',
    'Logros y reportes para mejorar la experiencia.',
    'Panel de notificaciones para mantenerse al día.'
  ];

  constructor() { }

  ngOnInit(): void {
    // Si necesitas inicializar algo, va aquí
  }
}
