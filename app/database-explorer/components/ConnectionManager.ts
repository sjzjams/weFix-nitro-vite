// app/database-explorer/components/ConnectionManager.ts

import { AppState } from '../state';

export class ConnectionManager {
  constructor(private element: HTMLElement, private state: AppState) {
    const container = document.createElement('div');
    container.innerHTML = '<h2>Connection</h2><p>Connection managed by server.</p>';
    this.element.appendChild(container);
  }

  render() {
    // Static component, no re-rendering needed
  }
}