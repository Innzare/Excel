import { $ } from '../../core/dom';
export function resizeHandler($root, event) {
   const $resizer = $(event.target);
   const $parent = $resizer.closest('[data-type="resizable"]');
   const coords = $parent.getCoords();
   const type = $resizer.data.resize;
   const sideProp = type === 'col' ? 'bottom' : 'right';
   const lineSize = sideProp === 'bottom' ? - (document.querySelector('.excel__table').clientHeight) + 24 + 'px' : - (document.querySelector('.excel__table').offsetWidth) + 24 + 'px';

   let value;


   $resizer.css({
      [sideProp]: lineSize,
   });

   document.onmousemove = (e) => {
      if (type == 'col') {
         const delta = e.pageX - coords.right;
         value = coords.width + delta;
         $resizer.css({ right: -delta + 'px' });
      } else {
         const delta = e.pageY - coords.bottom;
         value = coords.height + delta;
         $resizer.css({ bottom: -delta + 'px' });
      }
   };

   document.onmouseup = (e) => {
      if (type == 'col') {
         $root.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach((el) => el.style.width = value + 'px');
         $resizer.css({
            bottom: '0px',
            right: '-2px',
         });
      } else {
         $parent.css({ height: value + 'px' });
         $resizer.css({
            right: '0px',
            bottom: '-2px',
         });
      }
      document.onmousemove = null;
      document.onmouseup = null;
   };
}
