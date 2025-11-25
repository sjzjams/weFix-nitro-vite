// app/database-explorer/components/QueryPanel.ts

import { AppState } from '../state';
import { executeQuery } from '../api';

export class QueryPanel {
  private textarea: HTMLTextAreaElement;
  private executeButton: HTMLButtonElement;

  constructor(private element: HTMLElement, private state: AppState) {
    const container = document.createElement('div');
    container.innerHTML = '<h2>SQL Query</h2>';

    this.textarea = document.createElement('textarea');
    this.textarea.rows = 10;
    this.textarea.style.width = '100%';
    container.appendChild(this.textarea);

    this.executeButton = document.createElement('button');
    this.executeButton.textContent = 'Execute Query';
    container.appendChild(this.executeButton);

    this.element.appendChild(container);

    this.executeButton.addEventListener('click', async () => {
      const query = this.textarea.value;
      if (query) {
        try {
          const results = await executeQuery(query);
          this.state.setQueryResults(results);
        } catch (error) {
          console.error('Query execution error:', error);
          this.state.setQueryResults([]); // Clear results on error
        }
      }
    });
  }

  render() {
    // Initial render is handled by the constructor
  }
}