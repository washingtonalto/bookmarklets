alert("WLA CSS Selector Tool ver 2 - This is a simple CSS selector tool. To use, right click on the element of interest. This code will be removed once page is refreshed. Copyright: (c) 2023, Washington Alto");

class Popup {
	constructor() {
		this.createOverlay();
		this.createPopup();
	}

	createOverlay() {

		this.overlay = document.createElement('div');
		this.overlay.id = 'CSS-special-overlay';
		this.overlay.style.position = 'fixed';
		this.overlay.style.top = '0';
		this.overlay.style.left = '0';
		this.overlay.style.width = '100%';
		this.overlay.style.height = '100%';
		this.overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
		this.overlay.style.zIndex = '9998'; /* Below the popup */
		this.overlay.style.display = 'none';
		this.overlay.style.cursor = 'not-allowed';
		this.overlay.style.pointerEvents = 'none'; /* Disable pointer events for overlay */
		document.body.appendChild(this.overlay);
	}

	createPopup() {

		this.popup = document.createElement('div');
		this.popup.id = 'custom-popup';
		this.popup.style.position = 'fixed';
		this.popup.style.top = '50%';
		this.popup.style.left = '50%';
		this.popup.style.transform = 'translate(-50%, -50%)';
		this.popup.style.background = 'white';
		this.popup.style.border = '1px solid #ccc';
		this.popup.style.padding = '20px';
		this.popup.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
		this.popup.style.zIndex = '9999';
		this.popup.style.overflow = 'auto';

		this.closeIcon = document.createElement('div');
		this.closeIcon.id = 'close-icon';
		this.closeIcon.innerHTML = 'x';
		this.closeIcon.style.position = 'absolute';
		this.closeIcon.style.top = '10px';
		this.closeIcon.style.right = '10px';
		this.closeIcon.style.fontSize = '20px';
		this.closeIcon.style.fontWeight = 'bold';
		this.closeIcon.style.color = '#333';
		this.closeIcon.style.cursor = 'pointer';

		this.popup.appendChild(this.closeIcon);
		document.body.appendChild(this.popup);
	}

	displayText(text) {
		this.popup.innerHTML += '<BR>' + text;
		this.popup.style.display = 'block';
		this.overlay.style.pointerEvents = 'none'; /* Disable pointer events for overlay */
		this.overlay.style.display = 'block';
		this.popup.querySelector('#close-icon').addEventListener('click', this.closePopUp.bind(this));
	}

	closePopUp() {
		hasPopup = false;
		this.popup.style.display = 'none';
		this.overlay.style.pointerEvents = 'auto'; /* Enable pointer events for overlay */
		this.overlay.style.display = 'none';
		document.body.removeChild(this.popup);
		document.body.removeChild(this.overlay);
	}

}

function encode_HTML (strHTML) {
	return strHTML.replace(/\>/g,"&gt;").replace(/\</g,"&lt;");
}

function getLongCssSelector(element) {
  if (!(element instanceof Element)) return;

  const selectors = [];
  
  while (element.parentElement) {
    let selector = element.tagName.toLowerCase();

    if (element.id) {
      selector += `#${element.id}`;
      selectors.unshift(selector);
      break;
    } else {
      let index = Array.from(element.parentElement.children).indexOf(element) + 1;
      selector += `:nth-child(${index})`;
    }
    
    selectors.unshift(selector);
    element = element.parentElement;
  }

  return selectors.join(' > ');
}

function getCssSelectorWithIdOrClass(element) {
  if (!(element instanceof Element)) return;

  const id = element.id;
  if (id) {
    return `#${id}`;
  }

  const classes = Array.from(element.classList).join('.');
  if (classes) {
    return `.${classes}`;
  }

  return null;
}

function getCssSelector (element) {
	return (getCssSelectorWithIdOrClass(element) && getCssSelectorWithIdOrClass(element) != null ) ? getCssSelectorWithIdOrClass(element) : getLongCssSelector(element);
}

const selectEventHandler = e => {
		e.preventDefault();
		const targetElement = e.target;
		let modal_body_text = "<STRONG>Element Selected:</STRONG><BR><BR>" + encode_HTML(targetElement.outerHTML) + "<BR><BR><BR>"+
							  "<STRONG>Text of Element Selected:</STRONG><BR><BR>" + targetElement.textContent + "<BR><BR><BR>"+
		                      "<STRONG>Basic CSS Selector:</STRONG><BR>" + getCssSelector(targetElement) + "<BR><BR><BR>"; 
		if (!hasPopup) {
			hasPopup = true;
			const popup = new Popup();
			popup.displayText(modal_body_text);
		}
	}
	
	var hasPopup = false;
	bodyElement = document.querySelector("body");
    bodyElement.addEventListener("contextmenu", selectEventHandler);
