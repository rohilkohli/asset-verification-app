document.getElementById('file-input').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const csvData = e.target.result;
    displayTable(csvData);
  };
  reader.readAsText(file);
});

function displayTable(csvData) {
  const rows = csvData.split('\n').map(r => r.trim()).filter(r => r.length);
  const table = document.createElement('table');
  rows.forEach((row, index) => {
    const cols = row.split(',');
    const tr = document.createElement('tr');
    cols.forEach(col => {
      const cell = document.createElement(index === 0 ? 'th' : 'td');
      cell.textContent = col;
      tr.appendChild(cell);
    });
    table.appendChild(tr);
  });
  const container = document.getElementById('table-container');
  container.innerHTML = '';
  container.appendChild(table);
}
