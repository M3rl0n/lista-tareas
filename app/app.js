const form = document.getElementById('form');
const texto = document.getElementById('texto');
const lista = document.getElementById('lista');
let tareas = JSON.parse(localStorage.getItem('tareas') || '[]');

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

form.onsubmit = e => {
  e.preventDefault();
  tareas.push(texto.value);
  texto.value = '';
  guardar();
};

render();
