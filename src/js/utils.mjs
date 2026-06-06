// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw {
      name: 'servicesError',
      message: jsonResponse
    };
  }
}

export function renderListWithTemplate(
  template,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  const htmlStrings = list.map(template);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter(callback) {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement, null, callback,);
  renderWithTemplate(footerTemplate, footerElement);
}

export function getDiscountPercentage(originalPrice, finalPrice) {
  return Math.round(((originalPrice - finalPrice) / originalPrice) * 100);
}
export function alertMessage(message, scroll = true) {
  // remove alert antigo (se existir)
  const oldAlert = document.querySelector('.alert');
  if (oldAlert) oldAlert.remove();

  // cria elemento
  const alert = document.createElement('div');
  alert.classList.add('alert');

  // conteúdo do alerta
  alert.innerHTML = `
    <span>${message}</span>
    <button class="close-btn">X</button>
  `;

  // referência do main
  const main = document.querySelector('main');

  // botão fechar
  alert.addEventListener('click', function (e) {
    if (e.target.classList.contains('close-btn')) {
      main.removeChild(alert);
    }
  });

  // adiciona no topo
  main.prepend(alert);

  // scroll topo
  if (scroll) {
    window.scrollTo(0, 0);
  }
}
