// app/database-explorer/state.ts

// A simple event emitter and state holder
type Listener = (payload?: any) => void;

class EventEmitter {
  private listeners: { [key: string]: Listener[] } = {};

  on(event: string, listener: Listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  emit(event: string, payload?: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(listener => listener(payload));
    }
  }
}

export class AppState extends EventEmitter {
  private _tables: string[] = [];
  private _selectedTable: string = '';

  get tables() {
    return this._tables;
  }

  setTables(tables: string[]) {
    this._tables = tables;
    this.emit('tablesChanged', tables);
  }

  get selectedTable() {
    return this._selectedTable;
  }

  setSelectedTable(tableName: string) {
    this._selectedTable = tableName;
    this.emit('selectedTableChanged', tableName);
  }

  setQueryResults(results: any[]) {
    this.emit('queryResultsChanged', results);
  }
}

export const state = new AppState();