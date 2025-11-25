document.addEventListener('DOMContentLoaded', () => {
    const tableList = document.getElementById('table-list');
    const tableNameEl = document.getElementById('table-name');
    const tableStructureBody = document.querySelector('#table-structure tbody');
    const sampleDataHead = document.querySelector('#sample-data thead');
    const sampleDataBody = document.querySelector('#sample-data tbody');
    const paginationEl = document.getElementById('pagination');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    let currentTable = null;
    let currentPage = 1;

    async function fetchTables() {
        try {
            const response = await fetch('/api/database/tables');
            const result = await response.json();
            if (result.code === 200) {
                tableList.innerHTML = '';
                result.data.forEach(table => {
                    const li = document.createElement('li');
                    li.textContent = table;
                    li.addEventListener('click', () => {
                        currentTable = table;
                        fetchTableDetails(table);
                    });
                    tableList.appendChild(li);
                });
            }
        } catch (error) {
            console.error('Failed to fetch tables:', error);
        }
    }

    async function fetchTableDetails(tableName, page = 1, search = '') {
        fetchTableStructure(tableName);
        fetchSampleData(tableName, page, search);
    }

    async function fetchTableStructure(tableName) {
        try {
            const response = await fetch(`/api/database/${tableName}`);
            const result = await response.json();
            if (result.code === 200) {
                tableNameEl.textContent = tableName;
                tableStructureBody.innerHTML = '';
                result.data.forEach(row => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${row.Field}</td>
                        <td>${row.Type}</td>
                        <td>${row.Null}</td>
                        <td>${row.Key}</td>
                        <td>${row.Default}</td>
                        <td>${row.Extra}</td>
                    `;
                    tableStructureBody.appendChild(tr);
                });
            }
        } catch (error) {
            console.error(`Failed to fetch structure for table ${tableName}:`, error);
        }
    }

    async function fetchSampleData(tableName, page = 1, search = '') {
        try {
            const response = await fetch(`/api/database/${tableName}/data?page=${page}&limit=10&search=${search}`);
            const result = await response.json();
            if (result.code === 200) {
                const { data, pagination } = result;
                sampleDataHead.innerHTML = '';
                sampleDataBody.innerHTML = '';

                if (data.length > 0) {
                    const headers = Object.keys(data[0]);
                    const headerRow = document.createElement('tr');
                    headers.forEach(header => {
                        const th = document.createElement('th');
                        th.textContent = header;
                        headerRow.appendChild(th);
                    });
                    sampleDataHead.appendChild(headerRow);

                    data.forEach(row => {
                        const tr = document.createElement('tr');
                        headers.forEach(header => {
                            const td = document.createElement('td');
                            td.textContent = row[header];
                            tr.appendChild(td);
                        });
                        sampleDataBody.appendChild(tr);
                    });
                }

                renderPagination(pagination);
            }
        } catch (error) {
            console.error(`Failed to fetch data for table ${tableName}:`, error);
        }
    }

    function renderPagination(pagination) {
        paginationEl.innerHTML = '';
        if (!pagination || pagination.totalPages <= 1) return;

        for (let i = 1; i <= pagination.totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.textContent = i;
            if (i === pagination.page) {
                pageLink.classList.add('active');
            }
            pageLink.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                fetchSampleData(currentTable, currentPage, searchInput.value);
            });
            paginationEl.appendChild(pageLink);
        }
    }

    searchButton.addEventListener('click', () => {
        if (currentTable) {
            currentPage = 1;
            fetchSampleData(currentTable, currentPage, searchInput.value);
        }
    });

    fetchTables();
});