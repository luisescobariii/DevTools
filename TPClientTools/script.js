let test;

async function AddDynamicRow(tableId) {
    let rows = document.querySelectorAll(`#${tableId} > tbody > tr`);
    let sampleRow = rows[rows.length - 1];
    let cells = [];
    for (let sampleCell of sampleRow.cells) {
        let cell = sampleCell.cloneNode(true);
        let input = cell.querySelector('input') || cell.querySelector('select');
        if (input) {
            if (!cell.dataset.autoincrement && !cell.dataset.keep) {
                input.value = '';
                input.checked = false;
                input.selectedIndex = -1;
            }
            if (cell.dataset.autoincrement) {
                let value = input.value.toString();
                let matches = value.toString().match(/[0-9]/g);
                if (matches) {
                    let number = matches[matches.length - 1];
                    let pos = value.lastIndexOf(number);
                    input.value = value.slice(0, pos) + (number * 1 + 1) + value.slice(pos + number.length);
                }
            }
        }
        cells.push(cell);
    }
    let row = document.createElement('tr');
    for (let cell of cells) { row.appendChild(cell); }
    document.querySelector(`#${tableId} > tbody`).appendChild(row);
}

async function RemoveDynamicRow(tableId) {
    let body = document.querySelector(`#${tableId} > tbody`);
    if (body.children.length > 1) {
        body.removeChild(body.lastChild);
    }
}