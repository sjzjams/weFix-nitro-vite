// app/database-explorer/components/ResultsDisplay.test.ts

import { vi, describe, it, expect, beforeEach } from 'vitest';
import { AppState } from '../state';
import { ResultsDisplay } from './ResultsDisplay';
import { getTableData } from '../api';

// Mock the API module
vi.mock('../api', () => ({
  getTableData: vi.fn(),
}));

describe('ResultsDisplay', () => {
  let element: HTMLElement;
  let state: AppState;
  let resultsDisplay: ResultsDisplay;

  beforeEach(() => {
    element = document.createElement('div');
    state = new AppState();
    resultsDisplay = new ResultsDisplay(element, state);
    (getTableData as any).mockClear();
  });

  it('should render table data when a table is selected', async () => {
    const mockData = [{ id: 1, name: 'test' }];
    (getTableData as any).mockResolvedValue(mockData);

    state.setSelectedTable('test_table');

    // Wait for the async operation to complete
    await new Promise(resolve => setTimeout(resolve, 0));

    const table = element.querySelector('table');
    expect(table).not.toBeNull();
    const headers = element.querySelectorAll('th');
    expect(headers.length).toBe(2);
    expect(headers[0].textContent).toBe('id');
    expect(headers[1].textContent).toBe('name');
    const cells = element.querySelectorAll('td');
    expect(cells.length).toBe(2);
    expect(cells[0].textContent).toBe('1');
    expect(cells[1].textContent).toBe('test');
  });

  it('should render query results', () => {
    const mockData = [{ col1: 'a', col2: 'b' }];
    state.setQueryResults(mockData);

    const table = element.querySelector('table');
    expect(table).not.toBeNull();
    const headers = element.querySelectorAll('th');
    expect(headers.length).toBe(2);
    expect(headers[0].textContent).toBe('col1');
    expect(headers[1].textContent).toBe('col2');
  });
});