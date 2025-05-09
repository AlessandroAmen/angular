import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

// Interfaccia che definisce la struttura dello stato dei task
export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

// Stato iniziale dell'applicazione
const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null
};

@Injectable({
  providedIn: 'root'
})
export class TaskStore {
  // BehaviorSubject per gestire lo stato dell'applicazione
  private state = new BehaviorSubject<TaskState>(initialState);

  // Observable pubblico per osservare i cambiamenti dello stato
  tasks$ = this.state.asObservable();

  // Ottiene lo stato corrente
  getState(): TaskState {
    return this.state.getValue();
  }

  // Azioni per modificare lo stato

  // Imposta una nuova lista di task
  setTasks(tasks: Task[]): void {
    this.state.next({
      ...this.state.getValue(),
      tasks,
      loading: false,
      error: null
    });
  }

  // Aggiunge un nuovo task alla lista
  addTask(task: Task): void {
    const currentState = this.state.getValue();
    this.state.next({
      ...currentState,
      tasks: [...currentState.tasks, task],
      loading: false,
      error: null
    });
  }

  // Aggiorna un task esistente
  updateTask(task: Task): void {
    const currentState = this.state.getValue();
    const tasks = currentState.tasks.map(t => t.id === task.id ? task : t);
    this.state.next({
      ...currentState,
      tasks
    });
  }

  // Elimina un task dalla lista
  deleteTask(id: number): void {
    const currentState = this.state.getValue();
    const tasks = currentState.tasks.filter(t => t.id !== id);
    this.state.next({
      ...currentState,
      tasks,
      loading: false,
      error: null
    });
  }

  // Imposta lo stato di caricamento
  setLoading(loading: boolean): void {
    this.state.next({
      ...this.state.getValue(),
      loading
    });
  }

  // Imposta un messaggio di errore
  setError(error: string | null): void {
    this.state.next({
      ...this.state.getValue(),
      error,
      loading: false
    });
  }

  // Riordina i task (usato per il drag and drop)
  reorderTasks(previousIndex: number, currentIndex: number): void {
    const currentState = this.state.getValue();
    const tasks = [...currentState.tasks];
    const [movedTask] = tasks.splice(previousIndex, 1);
    tasks.splice(currentIndex, 0, movedTask);
    this.state.next({
      ...currentState,
      tasks
    });
  }
} 