/* eslint-disable require-jsdoc */
import { ExcelComponent } from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
   static className = 'excel__formula';

   constructor($root) {
      super($root, {
         name: 'Fomula',
         listeners: ['input', 'click'],
      });
   }
   toHTML() {
      return `
         <div class="formula-info">fx</div>
         <div class="formula-input" contenteditable="" spellcheck="false"></div>
      `;
   }

   onInput(event) {
      console.log('formula', event);
   }

   onClick() {
      console.log('1');
   }
}
