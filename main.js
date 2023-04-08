const input = document.querySelector("input");
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector("ul");
const empty = document.querySelector(".empty");

// Obtener las tareas almacenadas en localStorage al cargar la página
window.addEventListener("load", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  storedTasks.forEach((task) => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.textContent = task;

    li.appendChild(p);
    li.appendChild(addDeleteBtn());
    ul.appendChild(li);
  });

  if (storedTasks.length === 0) {
    empty.style.display = "block";
  }
});

addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const text = input.value;

  if (text !== "") {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.textContent = text;

    li.appendChild(p);
    li.appendChild(addDeleteBtn());
    ul.appendChild(li);

    // Guardar la tarea en localStorage
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.push(text);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));

    input.value = "";
    empty.style.display = "none";
  }
});

function addDeleteBtn() {
  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "X";
  deleteBtn.className = "btn-delete";

  deleteBtn.addEventListener("click", (e) => {
    const item = e.target.parentElement;
    ul.removeChild(item);

    // Eliminar la tarea del localStorage
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const text = item.querySelector("p").textContent;
    const index = storedTasks.indexOf(text);
    storedTasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));

    const items = document.querySelectorAll("li");

    if (items.length === 0) {
      empty.style.display = "block";
    }
  });

  return deleteBtn;
}
