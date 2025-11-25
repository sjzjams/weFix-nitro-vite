// app/database-explorer/components/QueryPanel.test.ts

import { vi, describe, it, expect, beforeEach } from 'vitest';
import { AppState } from '../state';
import { QueryPanel } from './QueryPanel';
import { executeQuery } from '../api';

// Mock the API module
vi.mock('../api', () => ({
  executeQuery: vi.fn(),
}));

describe('QueryPanel', () => {
  let element: HTMLElement;
  let state: AppState;
  let queryPanel: QueryPanel;

  beforeEach(() => {
    element = document.createElement('div');
    state = new AppState();
    queryPanel = new QueryPanel(element, state);
    (executeQuery as any).mockClear();
  });

  it('should execute a query and set the results', async () => {
    const mockResults = [{ result: 'ok' }];
    (executeQuery as any).mockResolvedValue(mockResults);
    const setQueryResultsSpy = vi.spyOn(state, 'setQueryResults');

    const textarea = element.querySelector('textarea');
    const button = element.querySelector('button');

    if (textarea && button) {
      textarea.value = 'SELECT * FROM test';
      button.click();
    }

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(executeQuery).toHaveBeenCalledWith('SELECT * FROM test');
    expect(setQueryResultsSpy).toHaveBeenCalledWith(mockResults);
  });
});