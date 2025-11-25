// app/database-explorer/components/TableBrowser.test.ts

import { vi, describe, it, expect, beforeEach } from 'vitest';
import { AppState } from '../state';
import { TableBrowser } from './TableBrowser';

// Mock the API module
vi.mock('../api', () => ({
  getTables: vi.fn().mockResolvedValue(['table1', 'table2']),
}));

describe('TableBrowser', () => {
  let element: HTMLElement;
  let state: AppState;
  let tableBrowser: TableBrowser;

  beforeEach(() => {
    element = document.createElement('div');
    state = new AppState();
    tableBrowser = new TableBrowser(element, state);
  });

  it('should render a list of tables', async () => {
    await tableBrowser.render();
    const listItems = element.querySelectorAll('li');
    expect(listItems.length).toBe(2);
    expect(listItems[0].textContent).toBe('table1');
    expect(listItems[1].textContent).toBe('table2');
  });

  it('should set the selected table on click', async () => {
    await tableBrowser.render();
    const setSelectedTableSpy = vi.spyOn(state, 'setSelectedTable');
    const firstTable = element.querySelector('li');
    firstTable?.click();
    expect(setSelectedTableSpy).toHaveBeenCalledWith('table1');
  });
});