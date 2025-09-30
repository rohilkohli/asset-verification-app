let fullData = [];
let headers = [];
let tableContainer = document.getElementById('table-container');
let filterAssetType = document.getElementById('filter-asset-type');

document.getElementById('file-input').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const csvData = e.target.result;
    parseCSVAndDisplay(csvData);
  };
  reader.readAsText(file);
});

function parseCSVAndDisplay(csvData) {
  const rows = csvData.trim().split('\n').map(r => r.trim());
  headers = rows[0].split(',');
  fullData = rows.slice(1).map(row => {
    const cols = row.split(',');
    let obj = {};
    headers.forEach((header, i) => {
      obj[header] = cols[i] ? cols[i].trim() : '';
    });
    return obj;
  });

  populateAssetTypeFilter();
  applyFiltersAndDisplay();
}

function populateAssetTypeFilter() {
  let assetTypes = new Set();
  fullData.forEach(item => {
    if (item['Asset Type']) {
      assetTypes.add(item['Asset Type']);
    }
  });
  // Clear existing options except first
  filterAssetType.options.length = 1;
  Array.from(assetTypes).sort().forEach(type => {
    const option = document.createElement('option');
    option.value = type;
    option.textContent = type;
    filterAssetType.appendChild(option);
  });
}

function applyFiltersAndDisplay() {
  let serialSearch = document.getElementById('search-serial').value.trim().toLowerCase();
  let makeSearch = document.getElementById('search-make').value.trim().toLowerCase();
  let assetTypeFilter = filterAssetType.value;
  let foundStatusFilter = document.getElementById('filter-found-status').value;

  let filteredData = fullData.filter(item => {
    let passesSerial = serialSearch === '' || (item['Serial Number'] && item['Serial Number'].toLowerCase().includes(serialSearch));
    let passesMake = makeSearch === '' || (item['Make'] && item['Make'].toLowerCase().includes(makeSearch));
    let passesAssetType = assetTypeFilter === '' || item['Asset Type'] === assetTypeFilter;
    let passesFoundStatus = true;
    if (foundStatusFilter === 'found') {
      passesFoundStatus = (item['Same Asset or Additional Found Asset'] && item['Same Asset or Additional Found Asset'].toLowerCase() === 'same asset');
    } else if (foundStatusFilter === 'notfound') {
      passesFoundStatus = !(item['Same Asset or Additional Found Asset'] && item['Same Asset or Additional Found Asset'].toLowerCase() === 'same asset');
    }
    return passesSerial && passesMake && passesAssetType && passesFoundStatus;
  });

  displayTable(filteredData);
}

function displayTable(data) {
  if (data.length === 0) {
    tableContainer.innerHTML = '<div class="no-results">No matching assets found</div>';
    return;
  }

  let table = document.createElement('table');
  // Table header
  const trHead = document.createElement('tr');
  headers.forEach(header => {
    let th = document.createElement('th');
    th.textContent = header;
    trHead.appendChild(th);
  });
  table.appendChild(trHead);

  // Table rows
  data.forEach(item => {
    const tr = document.createElement('tr');
    headers.forEach(header => {
      const td = document.createElement('td');
      td.textContent = item[header] || '';
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  tableContainer.innerHTML = '';
  tableContainer.appendChild(table);
}

// Attach filter event listeners
document.getElementById('search-serial').addEventListener('input', applyFiltersAndDisplay);
document.getElementById('search-make').addEventListener('input', applyFiltersAndDisplay);
filterAssetType.addEventListener('change', applyFiltersAndDisplay);
document.getElementById('filter-found-status').addEventListener('change', applyFiltersAndDisplay);
