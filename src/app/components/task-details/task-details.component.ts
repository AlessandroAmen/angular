import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="task-details-container">
      <h1>{{ isNewTask ? 'Nuovo Task' : 'Modifica Task' }}</h1>

      <form [formGroup]="taskForm" (ngSubmit)="onSubmit()" class="task-form">
        <mat-form-field appearance="fill">
          <mat-label>Titolo</mat-label>
          <input matInput formControlName="title" placeholder="Inserisci il titolo">
          <mat-error *ngIf="taskForm.get('title')?.hasError('required')">
            Il titolo è obbligatorio
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Descrizione</mat-label>
          <textarea matInput formControlName="description" rows="4" placeholder="Inserisci la descrizione"></textarea>
          <mat-error *ngIf="taskForm.get('description')?.hasError('required')">
            La descrizione è obbligatoria
          </mat-error>
        </mat-form-field>

        <div class="form-actions">
          <button mat-button type="button" routerLink="/tasks">
            <mat-icon>arrow_back</mat-icon>
            Annulla
          </button>
          <button mat-raised-button color="primary" type="submit" [disabled]="taskForm.invalid">
            <mat-icon>save</mat-icon>
            {{ isNewTask ? 'Crea' : 'Salva' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .task-details-container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }

    .task-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 16px;
    }
  `]
})
export class TaskDetailsComponent implements OnInit {
  taskForm: FormGroup;
  isNewTask = true;
  taskId?: number;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      completed: [false]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isNewTask = false;
      this.taskId = +id;
      const task = this.taskService.getTaskById(this.taskId);
      if (task) {
        this.taskForm.patchValue(task);
      } else {
        this.router.navigate(['/tasks']);
      }
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      
      if (this.isNewTask) {
        this.taskService.createTask(taskData);
      } else if (this.taskId) {
        this.taskService.updateTask(this.taskId, taskData);
      }
      
      this.router.navigate(['/tasks']);
    }
  }
}
