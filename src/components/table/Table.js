import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";

// eslint-disable-next-line require-jsdoc
export class Table extends ExcelComponent {
   static className = 'excel__table';
   toHTML() {
      return createTable(50);
   }
}
