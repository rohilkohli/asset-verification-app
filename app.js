body { font-family: 'Segoe UI', Arial, sans-serif; background: #f8fcff; margin: 0; }
.container { max-width: 98vw; margin: 2rem auto; background: #fff; border-radius: 10px; box-shadow: 0 2px 40px rgba(33,87,244,0.07); padding: 2rem; }
header { border-bottom: 1px solid #e1e8ee; margin-bottom: 1.3rem; }
h1 { color: #2365ad; font-size: 2.2rem; margin-bottom: 0.2em; }
input[type="file"], input[type="text"] { padding: 0.4rem 0.7rem; margin-right: 1rem; font-size: 1em; }
input[type="file"] { margin-bottom: 0.4em; }
.input-section { margin-bottom: 1.2rem; }
.filter-section { margin: 14px 0 0 0; display: flex; gap: 1.4rem; flex-wrap: wrap; }
.filter-section label { font-weight: 500; }

select, input[type="text"] {
  border: 1px solid #a2b7cf;
  border-radius: 4px;
  outline: 0;
  width: auto;
  background: #f4f9fc;
}
#table-container { margin-top: 1.5rem; overflow-x: auto; }

table { border-collapse: collapse; width: 100%; background: #fff; }
th, td { padding: 0.52rem 0.7rem; text-align: left; font-size: 0.98em; border: 1px solid #eaf2fa; }
th { background: #2365ad; color: #fff; position: sticky; top: 0; z-index: 1; }
tr:nth-child(even) { background: #f4f9fc; }
tr.selected { background: #e3f5c9; }
.status-Active { color: #197f30; font-weight: 700; background: #e3f5e9; }
.status-INACTIVE,
.status-Marked\\ For\\ Disposal-Tenured,
.status-EPCBlocked { color: #a32929; font-weight: 700; background: #f8e5e5; }
.status-Delivered { color: #005c8b; font-weight: 700; background: #e4f1fa; }
.status-Freepool { color: #c98513; font-weight: 700; background: #fff9d7; }

@media (max-width: 900px) {
  .container { padding: 1.1rem; }
  th, td { font-size: 0.96em; padding: 0.4rem 0.4rem;}
  .filter-section { flex-direction: column; gap: 0.7rem; }
}
