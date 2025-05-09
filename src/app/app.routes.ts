import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';

export const routes: Routes = [
  { path: '', component: TaskListComponent },            // Home page mostra la lista dei task
  { path: 'tasks', component: TaskListComponent },      // Lista dei task
  { path: 'tasks/new', component: TaskDetailsComponent }, // Creazione di un nuovo task
  { path: 'tasks/:id', component: TaskDetailsComponent }, // Modifica di un task esistente
];