// Interfaccia che definisce la struttura di un task
export interface Task {
  id?: number;           // ID univoco del task (opzionale perché generato automaticamente)
  title: string;         // Titolo del task
  description: string;   // Descrizione dettagliata del task
  completed: boolean;    // Stato di completamento del task
  createdAt: Date;       // Data di creazione del task
  updatedAt: Date;       // Data dell'ultimo aggiornamento del task
} 