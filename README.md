# Task Manager Angular

Un'applicazione moderna per la gestione dei task sviluppata con Angular 17, che implementa le best practice di sviluppo e offre un'interfaccia utente intuitiva.


- **Gestione Task Avanzata**
  - Creazione, modifica ed eliminazione di task
  - Categorizzazione dei task (Lavoro, Personale, Studio)
  - Priorità configurabile (Alta, Media, Bassa)
  - Stato di completamento

- **Interfaccia Utente Moderna**
  - Design responsive con Material Design
  - Drag-and-drop per il riordinamento dei task
  - Feedback visivo immediato
  - Tema scuro/chiaro

- **Architettura Robusta**
  - Gestione dello stato con pattern Store
  - Persistenza dei dati in localStorage
  - Routing avanzato
  - Componenti modulari e riutilizzabili

## Tecnologie Utilizzate

- Angular 17
- Angular Material
- RxJS
- TypeScript
- HTML5/CSS3
- Angular CDK (per drag-and-drop)

## 📋 Prerequisiti

- Node.js (versione 18 o superiore)
- npm (versione 9 o superiore)
- Angular CLI (versione 17)

## 🚀 Installazione

1. Clona il repository:
```bash
git clone https://github.com/tuousername/task-manager-angular.git
```

2. Installa le dipendenze:
```bash
cd task-manager-angular
npm install
```

3. Avvia il server di sviluppo:
```bash
ng serve
```

4. Apri il browser all'indirizzo `http://localhost:4200`

##  Funzionalità

### Gestione Task
- Creazione di nuovi task con titolo, descrizione e categoria
- Modifica dei task esistenti
- Eliminazione dei task
- Toggle dello stato di completamento
- Riordinamento tramite drag-and-drop

### Interfaccia Utente
- Navbar responsive con navigazione intuitiva
- Lista task con filtri per categoria
- Form di creazione/modifica task
- Feedback visivo per le azioni dell'utente

### Persistenza Dati
- Salvataggio automatico in localStorage
- Persistenza delle modifiche tra le sessioni
- Gestione robusta degli errori

## 🏗️ Architettura

Il progetto segue un'architettura modulare con:

- **Components**: UI components riutilizzabili
- **Services**: Logica di business e gestione dati
- **Store**: Gestione dello stato dell'applicazione
- **Models**: Interfacce e tipi TypeScript
- **Routes**: Configurazione del routing
