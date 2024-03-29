
alert('WLA CSS Selector Tool - This is a simple CSS selector tool. To use, right click on the element of interest. This code will be removed once page is refreshed. Copyright: (c) 2021, Washington Alto');


const selectEventHandler = (e) => {
  e.preventDefault();
  const targetElement = e.target;
  let modal_body_text = 'Element Selected: '  +
    targetElement.outerHTML + 
    '       ' +
    'Basic CSS Selector: ' + 
    targetElement.nodeName + (targetElement.id ? '#' + targetElement.id :  '.' + (targetElement.className ? String(targetElement.className).replaceAll(" ","."): ""));
    alert(modal_body_text);
}

const bodyElement = document.querySelector('body');
bodyElement.addEventListener('contextmenu',selectEventHandler);

