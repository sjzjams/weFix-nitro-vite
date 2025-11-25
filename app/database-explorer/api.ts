// app/database-explorer/api.ts

export async function getTables(): Promise<string[]> {
  try {
    const res = await fetch('/api/database/tables');
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.data; // 直接返回表名数组
  } catch (error) {
    console.error('Failed to fetch tables:', error);
    return [];
  }
}

export async function getTableData(tableName: string): Promise<any[]> {
  try {
    const res = await fetch(`/api/database/${tableName}/data`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Failed to fetch data for table ${tableName}:`, error);
    return [];
  }
}

export async function executeQuery(query: string): Promise<any[]> {
  try {
    const res = await fetch('/api/database/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Failed to execute query:', error);
    return [];
  }
}