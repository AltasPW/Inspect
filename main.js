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
    if (element.id === '-_element' || element.id === "dontGet" || element.id === "popup" || element.id === "_null") {
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
    popup.style.background = "transparent"
    popup.id = "dontGet"
    popup.innerHTML = `
<style>
  *:focus {
    outline: none;
  }
  #dontGet {
    color: #FFF;
    font-family: Arial, sans-serif;
    font-size: 1.2rem;
    margin: 2rem auto;
    padding: 1rem;
    text-align: center;
    text-transform: uppercase;
    background-color: #333;
    border-radius: 0.5rem;
    position: fixed;
    top: 50px;
    left: 50px;
    z-index: 999;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
    max-width: 500px;
    overflow: hidden;
  }

  #dontGet.closed {
    opacity: 0;
    pointer-events: none;
  }

  #dontGet hr {
    border-color: #FFF;
    margin: 0;
    width: 100%;
  }

  #dontGet p {
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #dontGet label {
    font-weight: bold;
    margin-right: 1rem;
    text-transform: uppercase;
    width: 7rem;
  }

  #dontGet input,
  #dontGet textarea {
    background-color: #f5f5f5;
    border: none;
    text-decoration:none;
    border-radius: 0.3rem;
    box-sizing: border-box;
    color: #333;
    font-size: 1rem;
    margin-left: 1rem;
    padding: 0.5rem;
    width: 60%;
    transition:0.3s;
  }
  #dontGet input:hover,
  #dontGet textarea:hover {
    background-color: #7a7a7a;
    border: none;
    text-decoration:none;
    border-radius: 0.3rem;
    box-sizing: border-box;
    color: #333;
    font-size: 1rem;
    margin-left: 1rem;
    padding: 0.5rem;
    width: 60%;
  }

  #dontGet input:focus,
  #dontGet textarea:focus {
    background-color: white;
    border: none;
    text-decoration:none;
    border-radius: 0.3rem;
    box-sizing: border-box;
    color: black;
    font-size: 1rem;
    margin-left: 1rem;
    padding: 0.5rem;
    width: 60%;
  }

  #dontGet textarea {
    height: 6rem;
    resize: none;
  }
  
  .toggle-panel {
    position: fixed;
    top: 10px;
    right: 10px;
    background-color: #FFF;
    border: 1px solid #333;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }
</style>

<div id="dontGet">
  <h1>Inspect Panel</h1>
  <hr>
  <form>
    <p>
      <label for="-_element">Tag name:</label>
      <input id="-_element" type="text" value="${element.tagName}" onchange="updateElementInfo()" />
    </p>
    <p>
      <label for="-_element">ID:</label>
      <input id="-_element" type="text" value="${element.id}" onchange="updateElementInfo()" />
    </p>
    <p>
      <label for="-_element">Classes:</label>
      <input id="-_element" type="text" value="${Array.from(element.classList).join(' ')}" onchange="updateElementInfo()" />
    </p>
    <p>
      <label for="-_element">Inner HTML:</label>
      <textarea id="-_element" onchange="updateElementInfo()">${element.innerHTML}</textarea>
    </p>
      <input id="-_element" type="button" onclick="updateElementInfo()" value="change"></input>
  </form>
</div>
<button id="_null" onclick="toggle(this)" class="toggle-panel">-</button>
  `;
    popup.style.display = 'block';
    makePanel(document.getElementById("dontGet").children[1]);
}

function toggle(e) {
    if (document.getElementById("dontGet").children[1].style.display === "block") {
        document.getElementById("dontGet").children[1].style.display = "none"
        e.innerHTML = "+"
    } else {
        document.getElementById("dontGet").children[1].style.display = "block"
        e.innerHTML = "-"
    }
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
