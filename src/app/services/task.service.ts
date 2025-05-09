import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task.model';
import { isPlatformBrowser } from '@angular/common';
import { TaskStore } from '../store/task.store';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private store: TaskStore
  ) {
    // Carica i task salvati nel localStorage all'avvio del servizio
    if (isPlatformBrowser(this.platformId)) {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        this.store.setTasks(tasks);
      }
    }
  }

  // Ottiene la lista di tutti i task
  getTasks(): Observable<Task[]> {
    return this.store.tasks$.pipe(
      map(state => state.tasks)
    );
  }

  // Ottiene un task specifico tramite ID
  getTaskById(id: number): Task | undefined {
    const state = this.store.getState();
    return state.tasks.find((task: Task) => task.id === id);
  }

  // Crea un nuovo task con ID e timestamp generati automaticamente
  createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
    const newTask: Task = {
      ...task,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.store.addTask(newTask);
    this.saveToLocalStorage();
    return newTask;
  }

  // Aggiorna un task esistente
  updateTask(id: number, task: Partial<Task>): Task | undefined {
    const state = this.store.getState();
    const index = state.tasks.findIndex((t: Task) => t.id === id);
    if (index === -1) return undefined;

    const updatedTask = {
      ...state.tasks[index],
      ...task,
      updatedAt: new Date()
    };
    this.store.updateTask(updatedTask);
    this.saveToLocalStorage();
    return updatedTask;
  }

  // Elimina un task
  deleteTask(id: number): boolean {
    const state = this.store.getState();
    const index = state.tasks.findIndex((t: Task) => t.id === id);
    if (index === -1) return false;

    this.store.deleteTask(id);
    this.saveToLocalStorage();
    return true;
  }

  // Cambia lo stato di completamento di un task
  toggleTaskCompletion(id: number): Task | undefined {
    const state = this.store.getState();
    const task = state.tasks.find((t: Task) => t.id === id);
    if (!task) return undefined;

    return this.updateTask(id, { completed: !task.completed });
  }

  // Genera un nuovo ID incrementale per i task
  private generateId(): number {
    const state = this.store.getState();
    return Math.max(0, ...state.tasks.map((t: Task) => t.id || 0)) + 1;
  }

  // Salva i task nel localStorage per persistenza
  private saveToLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const state = this.store.getState();
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }
  }
} 