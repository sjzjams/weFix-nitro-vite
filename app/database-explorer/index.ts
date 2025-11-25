// app/database-explorer/index.ts
// Main entry point for the Database Explorer

import { ConnectionManager } from './components/ConnectionManager';
import { TableBrowser } from './components/TableBrowser';
import { QueryPanel } from './components/QueryPanel';
import { ResultsDisplay } from './components/ResultsDisplay';
import { state } from './state';

export function setupDatabaseExplorer(element: HTMLElement) {
  // Clear the container
  element.innerHTML = '<h1>Database Explorer</h1>';

  const connectionManager = new ConnectionManager(element, state);
  const tableBrowser = new TableBrowser(element, state);
  const queryPanel = new QueryPanel(element, state);
  const resultsDisplay = new ResultsDisplay(element, state);

  // Initial render
  connectionManager.render();
  tableBrowser.render();
  queryPanel.render();
  resultsDisplay.render();
}