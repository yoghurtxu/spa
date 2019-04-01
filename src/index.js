console.info('test');
let num = [1, 2, 3];
let addNum = (num) => num.reduce((a, b) => a + b);
console.info(addNum(num));

import('./page1/index.js');

setTimeout(() => {
  document.querySelector('#app').outerHTML = `<div>loading finish</div>`;
}, 1000);