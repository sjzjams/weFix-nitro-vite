// app/database-explorer/components/TableBrowser.ts

import { AppState } from '../state';
import { getTables } from '../api';

export class TableBrowser {
  private tableList: HTMLElement;

  constructor(private element: HTMLElement, private state: AppState) {
    const container = document.createElement('div');
    container.innerHTML = '<h2>Tables</h2>';
    this.tableList = document.createElement('ul');
    container.appendChild(this.tableList);
    this.element.appendChild(container);

    this.state.on('tablesChanged', (tables) => this.renderTables(tables));
    this.state.on('selectedTableChanged', (selectedTable) => this.highlightSelectedTable(selectedTable));

    this.tableList.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'LI') {
        const tableName = target.textContent || '';
        this.state.setSelectedTable(tableName);
      }
    });
  }

  async render() {
    const tables = await getTables(); // 修改此处：不再解构 data
    this.state.setTables(tables);     // 直接将 tables 传入 state
  }

  private renderTables(tables: string[]) {
    this.tableList.innerHTML = tables.map(table => `<li data-table="${table}">${table}</li>`).join('');
  }

  private highlightSelectedTable(selectedTable: string) {
    this.tableList.querySelectorAll('li').forEach(li => {
      if (li.dataset.table === selectedTable) {
        li.classList.add('selected');
      } else {
        li.classList.remove('selected');
      }
    });
  }
}