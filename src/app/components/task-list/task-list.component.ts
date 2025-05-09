import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CdkDragDrop, DragDropModule, moveItemInArray, CdkDragEnter, CdkDragExit } from '@angular/cdk/drag-drop';
import { TaskService } from '../../services/task.service';
import { TaskStore } from '../../store/task.store';
import { Task } from '../../models/task.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    DragDropModule
  ],
  template: `
    <div class="task-list-container">
      <div class="header">
        <h1>I miei Task</h1>
        <button mat-raised-button color="primary" routerLink="/tasks/new">
          <mat-icon>add</mat-icon>
          Nuovo Task
        </button>
      </div>

      <div *ngIf="store.tasks$ | async as state">
        <div *ngIf="state.loading" class="loading">
          <mat-spinner diameter="40"></mat-spinner>
        </div>

        <div *ngIf="state.error" class="error">
          {{ state.error }}
        </div>

        <div *ngIf="!state.loading && state.tasks.length === 0" class="no-tasks">
          <p>Non ci sono task da visualizzare.</p>
          <button mat-raised-button color="primary" routerLink="/tasks/new">
            <mat-icon>add</mat-icon>
            Crea il tuo primo task
          </button>
        </div>

        <div *ngIf="!state.loading && state.tasks.length > 0" 
             cdkDropList 
             (cdkDropListDropped)="drop($event)"
             (cdkDropListEntered)="onDragEntered($event)"
             (cdkDropListExited)="onDragExited($event)"
             class="tasks-list"
             [cdkDropListData]="state.tasks">
          <mat-card *ngFor="let task of state.tasks" 
                   class="task-card" 
                   [class.completed]="task.completed"
                   [class.dragging]="isDragging"
                   cdkDrag
                   [cdkDragData]="task">
            <div class="drag-handle" cdkDragHandle>
              <mat-icon>drag_indicator</mat-icon>
            </div>

            <mat-card-header>
              <mat-card-title>
                <mat-checkbox
                  [checked]="task.completed"
                  (change)="toggleTaskCompletion(task.id!)"
                >
                  {{ task.title }}
                </mat-checkbox>
              </mat-card-title>
              <mat-card-subtitle>
                Creato il: {{ task.createdAt | date:'dd/MM/yyyy HH:mm' }}
              </mat-card-subtitle>
            </mat-card-header>
            
            <mat-card-content>
              <p class="description">{{ task.description }}</p>
              <p class="status" [class.completed]="task.completed">
                Stato: {{ task.completed ? 'Completato' : 'Da completare' }}
              </p>
            </mat-card-content>

            <mat-card-actions>
              <button mat-button color="primary" [routerLink]="['/tasks', task.id]">
                <mat-icon>edit</mat-icon>
                Modifica
              </button>
              <button mat-button color="warn" (click)="deleteTask(task.id!)">
                <mat-icon>delete</mat-icon>
                Elimina
              </button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .task-list-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding: 0 16px;
    }

    .tasks-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 0 16px;
    }

    .task-card {
      margin-bottom: 0;
      transition: all 0.3s ease;
      position: relative;
      cursor: move;
      width: 100%;
    }

    .task-card.completed {
      background-color: #f5f5f5;
    }

    .task-card.completed mat-card-title {
      text-decoration: line-through;
      color: #666;
    }

    .task-card.dragging {
      opacity: 0.5;
      transform: scale(0.95);
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    }

    .drag-handle {
      position: absolute;
      top: 8px;
      right: 8px;
      color: #ccc;
      cursor: move;
      width: 24px;
      height: 24px;
      transition: color 0.2s ease;
    }

    .drag-handle:hover {
      color: #666;
    }

    .cdk-drag-preview {
      box-sizing: border-box;
      border-radius: 4px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
      opacity: 0.8;
      transform: scale(1.05);
    }

    .cdk-drag-placeholder {
      opacity: 0.3;
      background: #ccc;
      border-radius: 4px;
    }

    .cdk-drag-animating {
      transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
    }

    .tasks-list.cdk-drop-list-dragging .task-card:not(.cdk-drag-placeholder) {
      transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
    }

    mat-card-content {
      margin-top: 16px;
    }

    .description {
      margin-bottom: 8px;
      color: #333;
    }

    .status {
      font-size: 0.9em;
      color: #666;
    }

    .status.completed {
      color: #4caf50;
    }

    mat-card-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 8px;
    }

    .no-tasks {
      text-align: center;
      padding: 40px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin: 20px 16px;
    }

    .no-tasks p {
      margin-bottom: 20px;
      color: #666;
    }

    .loading {
      display: flex;
      justify-content: center;
      padding: 40px;
    }

    .error {
      color: #f44336;
      text-align: center;
      padding: 20px;
      background: #ffebee;
      border-radius: 4px;
      margin: 20px 16px;
    }

    h1 {
      color: #333;
      font-size: 24px;
      margin: 0;
    }
  `]
})
export class TaskListComponent implements OnInit {
  isDragging = false;

  constructor(
    private taskService: TaskService,
    public store: TaskStore
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  async loadTasks(): Promise<void> {
    this.store.setLoading(true);
    try {
      const tasks = await firstValueFrom(this.taskService.getTasks());
      this.store.setTasks(tasks);
    } catch (error) {
      this.store.setError('Errore nel caricamento dei task');
      console.error('Error loading tasks:', error);
    } finally {
      this.store.setLoading(false);
    }
  }

  toggleTaskCompletion(id: number): void {
    const state = this.store.getState();
    const task = state.tasks.find((t: Task) => t.id === id);
    if (task) {
      const updatedTask = { ...task, completed: !task.completed };
      this.taskService.updateTask(id, updatedTask);
    }
  }

  deleteTask(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questo task?')) {
      this.taskService.deleteTask(id);
    }
  }

  onDragEntered(event: CdkDragEnter<Task[]>): void {
    this.isDragging = true;
  }

  onDragExited(event: CdkDragExit<Task[]>): void {
    this.isDragging = false;
  }

  drop(event: CdkDragDrop<Task[]>): void {
    this.isDragging = false;
    
    if (event.previousIndex === event.currentIndex) {
      return;
    }

    const state = this.store.getState();
    const tasks = [...state.tasks];
    const [movedTask] = tasks.splice(event.previousIndex, 1);
    tasks.splice(event.currentIndex, 0, movedTask);
    
    this.store.setTasks(tasks);
    
    // Salva l'ordine nel localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('taskOrder', JSON.stringify(tasks.map(t => t.id)));
    }
  }
}
