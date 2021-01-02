const CODES = {
   A: 65,
   Z: 90,
};

function createCell() {
   return `
      <div class="cell" contenteditable>
         
      </div>
   `;
}

function createCol(col) {
   return `
      <div class="column">
         ${col}
      </div>
   `;
}

function createRow(content, index) {
   return `
      <div class="row">
         <div class="row-info">${index ? index : ''}</div>
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
      .map((el) => {
         return createCol(el);
      })
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
