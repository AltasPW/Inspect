let selectedElement;

// create popup element
const popup = document.createElement('div');
popup.id = 'popup';
popup.style.display = 'none';
popup.style.position = 'fixed';
popup.style.top = '0';
popup.style.left = '0';
popup.style.padding = '10px';
popup.style.backgroundColor = 'white';
popup.style.border = '1px solid black';
popup.style.zIndex = '9999';
document.body.appendChild(popup);

// create input fields for editing element info
const tagNameInput = document.createElement('input');
tagNameInput.type = 'text';
tagNameInput.placeholder = 'Tag name';
tagNameInput.addEventListener('mousedown', (event) => {
  event.preventDefault();
});
popup.appendChild(tagNameInput);

const idInput = document.createElement('input');
idInput.type = 'text';
idInput.placeholder = 'ID';
idInput.addEventListener('mousedown', (event) => {
  event.preventDefault();
});
popup.appendChild(idInput);

const classesInput = document.createElement('input');
classesInput.type = 'text';
classesInput.placeholder = 'Classes (separate by spaces)';
classesInput.addEventListener('mousedown', (event) => {
  event.preventDefault();
});
popup.appendChild(classesInput);

const innerHTMLInput = document.createElement('textarea');
innerHTMLInput.placeholder = 'Inner HTML';
innerHTMLInput.addEventListener('mousedown', (event) => {
  event.preventDefault();
});
popup.appendChild(innerHTMLInput);

function updateElementInfo() {
  if (!selectedElement) {
    return;
  }
  
  selectedElement.tagName = document.querySelectorAll("[id='-_element']")[0].value;
  selectedElement.id = document.querySelectorAll("[id='-_element']")[1].value;
  selectedElement.classList = document.querySelectorAll("[id='-_element']")[2].value;
  selectedElement.innerHTML = document.querySelectorAll("[id='-_element']")[3].value;
}

function handleElementClick(event) {
  // get the element that was clicked
  const element = event.target;
  if (element.id === '-_element' || element.id==="dontGet" || element.id==="popup") {
    return;
  }
  // remove highlight from previously selected element, if any
  if (selectedElement) {
    selectedElement.style.outline = '';
  }

  // highlight the element by adding a red outline
  element.style.outline = '2px solid red';

  // update the selected element variable
  selectedElement = element;
  // update the popup with information about the element
  popup.innerHTML = `
    <style>
        #dontGet{
            color:black;
        }
    </style> 
    <p id="dontGet"><strong id="dontGet">Tag name:</strong> <input id="-_element" type="text" value="${element.tagName}" onchange="updateElementInfo()" /></p>
    <p id="dontGet"><strong id="dontGet">ID:</strong> <input id="-_element" type="text" value="${element.id}" onchange="updateElementInfo()" /></p>
    <p id="dontGet"><strong id="dontGet">Classes:</strong> <input id="-_element" type="text" value="${Array.from(element.classList).join(' ')}" onchange="updateElementInfo()" /></p>
    <p id="dontGet"><strong id="dontGet">Inner HTML:</strong></p>
    <textarea id="-_element" onchange="updateElementInfo()">${element.innerHTML}</textarea>
  `;
  popup.style.display = 'block';
}

function handleMouseLeave(event) {
  // remove the highlight from the element
  if (selectedElement) {
    selectedElement.style.outline = '';
  }

  // hide the popup
  popup.style.display = 'none';

  // clear the selected element variable
  selectedElement = null;
}

// add event listeners to track element clicks and leave
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('menu')) {
    return;
  }
  handleElementClick(event);
});
// create input fields for editing element info
tagNameInput.type = 'text';
tagNameInput.placeholder = 'Tag name';
tagNameInput.addEventListener('mousedown', (event) => {
  event.preventDefault();
});
popup.appendChild(tagNameInput);

idInput.type = 'text';
idInput.placeholder = 'ID';
idInput.addEventListener('mousedown', (event) => {
  event.preventDefault();
});
popup.appendChild(idInput);

classesInput.type = 'text';
classesInput.placeholder = 'Classes (separate by spaces)';
classesInput.addEventListener('mousedown', (event) => {
  event.preventDefault();
});
popup.appendChild(classesInput);

innerHTMLInput.placeholder = 'Inner HTML';
innerHTMLInput.addEventListener('mousedown', (event) => {
  event.preventDefault();
});
innerHTMLInput.addEventListener('change', () => {
  updateElementInfo();
});
popup.appendChild(innerHTMLInput);

function makePanel(element) {
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  element.addEventListener('mousedown', handleMouseDown);
  element.addEventListener('mouseup', handleMouseUp);
  element.addEventListener('mousemove', handleMouseMove);

  function handleMouseDown(event) {
    element.style.opacity = '0.5';
    isDragging = true;
    dragOffsetX = event.clientX - element.offsetLeft;
    dragOffsetY = event.clientY - element.offsetTop;
  }

  function handleMouseUp(event) {
    if (isDragging) {
      element.style.opacity = '1';
      isDragging = false;
    }
  }

  function handleMouseMove(event) {
    if (isDragging) {
      const x = event.clientX - dragOffsetX;
      const y = event.clientY - dragOffsetY;
      const maxX = window.innerWidth - element.offsetWidth;
      const maxY = window.innerHeight - element.offsetHeight;
      element.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
      element.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
    }
  }
}

makePanel(popup);
