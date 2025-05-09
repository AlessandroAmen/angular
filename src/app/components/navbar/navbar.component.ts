import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <!-- Barra di navigazione principale con logo e pulsante per nuovo task -->
    <mat-toolbar class="navbar">
      <span class="logo" routerLink="/">Task Manager</span>
      <span class="spacer"></span>
      <button mat-raised-button color="accent" routerLink="/tasks/new" class="new-task-btn">
        <mat-icon>add</mat-icon>
        Nuovo Task
      </button>
    </mat-toolbar>
  `,
  styles: [`
    /* Stile della navbar con gradiente e ombra */
    .navbar {
      background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 0 24px;
      height: 64px;
    }

    /* Stile del logo con effetto hover */
    .logo {
      font-size: 1.5rem;
      font-weight: 500;
      cursor: pointer;
      color: white;
      text-decoration: none;
      transition: opacity 0.2s ease;
      display: flex;
      align-items: center;
    }

    .logo:hover {
      opacity: 0.9;
    }

    /* Spazio flessibile per posizionare gli elementi */
    .spacer {
      flex: 1 1 auto;
    }

    /* Stile del pulsante "Nuovo Task" con effetti hover */
    .new-task-btn {
      border-radius: 20px;
      padding: 0 20px;
      height: 40px;
      font-weight: 500;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .new-task-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }

    .new-task-btn mat-icon {
      margin-right: 4px;
    }
  `]
})
export class NavbarComponent {}
