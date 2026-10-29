const form = document.getElementById('form');
const texto = document.getElementById('texto');
const lista = document.getElementById('lista');

function cargarTareas() {
  try {
    const datos = JSON.parse(localStorage.getItem('tareas') || '[]');
    return Array.isArray(datos) ? datos : [];
  } catch (e) {
    return [];
  }
}

let tareas = cargarTareas();

function render() {
  lista.innerHTML = '';
  tareas.forEach((t, i) => {
    const li = document.createElement('li');
    li.textContent = t;
    const btn = document.createElement('button');
    btn.textContent = 'X';
    btn.onclick = () => { tareas.splice(i, 1); guardar(); };
    li.appendChild(btn);
    lista.appendChild(li);
  });
}

function guardar() {
  localStorage.setItem('tareas', JSON.stringify(tareas));
  render();
}

texto.oninput = () => texto.setCustomValidity('');

form.onsubmit = e => {
  e.preventDefault();
  const valor = texto.value.trim();
  if (valor === '') {
    texto.setCustomValidity('Escribe una tarea (no solo espacios).');
    texto.reportValidity();
    return;
  }
  tareas.push(valor);
  texto.value = '';
  guardar();
};

render();
