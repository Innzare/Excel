const CODES = {
   A: 65,
   Z: 90,
};

function createCell(item, index) {
   return `
      <div class="cell" contenteditable data-col="${index}">
         
      </div>
   `;
}

function createCol(col, index) {
   return `
      <div class="column" data-type="resizable" data-col="${index}">
         ${col}
         <div class="col-resize" data-resize="col"></div>
      </div>
   `;
}

function createRow(content, index) {
   const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';
   return `
      <div class="row" data-type="resizable">
         <div class="row-info">
            ${index ? index : ''}
            ${resize}
         </div>
         <div class="row-data">${content}</div>
      </div>
   `;
}

export function createTable(rowsCount = 15) {
   const colsCount = CODES.Z - CODES.A + 1;
   const rows = [];

   const cols = new Array(colsCount)
      .fill('')
      .map((el, index) => {
         return String.fromCharCode(CODES.A + index);
      })
      .map(createCol)
      .join('');

   rows.push(createRow(cols));

   for (let index = 0; index < rowsCount; index++) {
      const cells = new Array(colsCount)
         .fill('')
         .map(createCell)
         .join('');

      rows.push(createRow(cells, index + 1));
   }

   return rows.join('');
}
