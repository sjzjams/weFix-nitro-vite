// app/database-explorer/components/ResultsDisplay.ts

import { AppState } from '../state';
import { getTableData } from '../api';

export class ResultsDisplay {
  private container: HTMLElement;

  constructor(private element: HTMLElement, private state: AppState) {
    this.container = document.createElement('div');
    this.container.innerHTML = '<h2>Results</h2>';
    this.element.appendChild(this.container);

    this.state.on('selectedTableChanged', async (tableName) => {
      if (tableName) {
        await this.renderTableData(tableName);
      } else {
        this.clear();
      }
    });

    this.state.on('queryResultsChanged', (results) => {
      this.renderQueryResults(results);
    });
  }

  private renderQueryResults(data: any[]) {
    if (!data || data.length === 0) {
      this.container.innerHTML = '<h2>Results</h2><p>Query returned no results.</p>';
      return;
    }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const headers = Object.keys(data[0]);

    const headerRow = document.createElement('tr');
    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    data.forEach(rowData => {
      const row = document.createElement('tr');
      headers.forEach(header => {
        const td = document.createElement('td');
        td.textContent = String(rowData[header]);
        row.appendChild(td);
      });
      tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    this.container.innerHTML = '<h2>Results</h2>';
    this.container.appendChild(table);
  }

  private async renderTableData(tableName: string) {
    try {
      const data = await getTableData(tableName);
      if (!data || data.length === 0) {
        this.container.innerHTML = '<h2>Results</h2><p>No data found for this table.</p>';
        return;
      }

      const table = document.createElement('table');
      const thead = document.createElement('thead');
      const tbody = document.createElement('tbody');
      const headers = Object.keys(data[0]);

      const headerRow = document.createElement('tr');
      headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);

      data.forEach(rowData => {
        const row = document.createElement('tr');
        headers.forEach(header => {
          const td = document.createElement('td');
          td.textContent = String(rowData[header]);
          row.appendChild(td);
        });
        tbody.appendChild(row);
      });

      table.appendChild(thead);
      table.appendChild(tbody);

      this.container.innerHTML = '<h2>Results</h2>';
      this.container.appendChild(table);
    } catch (error) {
      this.container.innerHTML = `<h2>Results</h2><p>Error fetching data: ${(error as Error).message}</p>`;
    }
  }

  private clear() {
    this.container.innerHTML = '<h2>Results</h2>';
  }

  render() {
    // Initial render is handled by event listeners
  }
}