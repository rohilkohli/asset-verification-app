const selectedColumns = [
  "Asset Code",
  "Serial Number",
  "Make",
  "Model",
  "Asset Type",
  "PAV Status",
  "Asset status",
  "Asset Availability Remarks",
  "New Branch Code",
  "Disposal Ticket",
  "Primary Owner",
  "Secondary owner"
];

let assetData = [];
let filteredData = [];

const fileInput = document.getElementById("file-input");
const tableContainer = document.getElementById("table-container");
const searchInput = document.getElementById("search-input");
const filterAssetType = document.getElementById("filter-asset-type");

fileInput.addEventListener("change", handleFileSelect);
searchInput.addEventListener("input", handleFilters);
filterAssetType.addEventListener("change", handleFilters);

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const csvData = e.target.result;
    assetData = parseCSV(csvData);
    populateFilterOptions(assetData);
    filteredData = assetData;
    renderTable(filteredData);
  };
  reader.readAsText(file);
}

function parseCSV(csvData) {
  const lines = csvData.trim().split("\n");
  // Get headers as array
  const headers = lines[0].split(",").map(h => h.trim());

  // Find indexes of columns we want to keep
  const colIndexes = selectedColumns.map(col => headers.indexOf(col));
  
  // Filter data rows, keep only selected columns
  const data = lines.slice(1).map(line => {
    const cols = line.split(",").map(c => c.trim());
    return colIndexes.map(i => (i >= 0 ? cols[i] : ""));
  });

  // Return array with header row as first item
  return [selectedColumns, ...data];
}

function renderTable(data) {
  const table = document.createElement("table");

  data.forEach((row, rowIndex) => {
    const tr = document.createElement("tr");
    row.forEach(cell => {
      const cellElem = document.createElement(rowIndex === 0 ? "th" : "td");
      cellElem.textContent = cell;
      tr.appendChild(cellElem);
    });
    table.appendChild(tr);
  });

  tableContainer.innerHTML = "";
  tableContainer.appendChild(table);
}

function populateFilterOptions(data) {
  const assetTypeIndex = selectedColumns.indexOf("Asset Type");
  if (assetTypeIndex === -1) return;
  
  const assetTypes = new Set();
  // Skip header row
  data.slice(1).forEach(row => {
    assetTypes.add(row[assetTypeIndex]);
  });

  // Clear old options, keep the default one
  while (filterAssetType.options.length > 1) {
    filterAssetType.remove(1);
  }

  Array.from(assetTypes).sort().forEach(type => {
    if (type) {
      const option = document.createElement("option");
      option.value = type;
      option.textContent = type;
      filterAssetType.appendChild(option);
    }
  });
}

function handleFilters() {
  const searchValue = searchInput.value.trim().toLowerCase();
  const filterValue = filterAssetType.value;

  const serialIndex = selectedColumns.indexOf("Serial Number");
  const makeIndex = selectedColumns.indexOf("Make");
  const assetTypeIndex = selectedColumns.indexOf("Asset Type");

  filteredData = assetData.filter((row, index) => {
    if (index === 0) return true; // keep header

    const serialNum = row[serialIndex]?.toLowerCase() || "";
    const make = row[makeIndex]?.toLowerCase() || "";
    const assetType = row[assetTypeIndex] || "";

    const matchesSearch = searchValue === "" || 
      serialNum.includes(searchValue) || 
      make.includes(searchValue) || 
      assetType.toLowerCase().includes(searchValue);

    const matchesFilter = filterValue === "" || assetType === filterValue;

    return matchesSearch && matchesFilter;
  });

  renderTable(filteredData);
}
