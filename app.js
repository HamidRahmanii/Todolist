//Quary Selectors
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const addButton = document.querySelector(".todo-add-button");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
addButton.addEventListener("click", addTodo);
todoList.addEventListener("click", clickTodo);

let deleteClickCount = 0;

//Functions
function addTodo(e) {
  e.preventDefault();
  if (todoInput.value === "") {
    return;
  }
  const todoUl = document.createElement("ul");
  todoUl.classList.add("todo-div");
  const todoTopic = document.createElement("li");
  todoTopic.classList.add("todo-topic");
  todoTopic.innerText = todoInput.value;
  saveLocalTodos(todoInput.value);
  const completeButton = document.createElement("i");
  completeButton.classList.add("fa-solid");
  completeButton.classList.add("fa-check");
  completeButton.classList.add("todo-complete-button");
  const trashButton = document.createElement("i");
  trashButton.classList.add("fa-solid");
  trashButton.classList.add("fa-trash");
  trashButton.classList.add("todo-trash-button");
  todoUl.appendChild(todoTopic);
  todoUl.appendChild(completeButton);
  todoUl.appendChild(trashButton);
  todoList.appendChild(todoUl);
  todoInput.value = "";
}

function clickTodo(e) {
  e.preventDefault();
  const item = e.target;
  const parentElement = item.parentElement;
  console.log("item.classList", item.classList);
  if (Array.from(item.classList).includes("todo-complete-button")) {
    parentElement.children[0].classList.toggle("done-todo-input");
    parentElement.children[1].classList.toggle("done-todo-button");
  }
  if (Array.from(item.classList).includes("todo-trash-button")) {
    deleteClickCount++;
    if (deleteClickCount % 2 === 0) {
      parentElement.classList.add("delete-transition1");
    } else {
      parentElement.classList.add("delete-transition2");
    }
    console.log("todo", parentElement);
    const todo = parentElement.children[0].innerText;
    removeLocalTodos(todo);
    parentElement.addEventListener("transitionend", () =>
      parentElement.remove()
    );
  }
}
function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.splice(todos.indexOf(todo), 1);

  console.log("todos", todos);

  localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoUl = document.createElement("ul");
    todoUl.classList.add("todo-div");
    const todoTopic = document.createElement("li");
    todoTopic.classList.add("todo-topic");
    todoTopic.innerText = todo;
    const completeButton = document.createElement("i");
    completeButton.classList.add("fa-solid");
    completeButton.classList.add("fa-check");
    completeButton.classList.add("todo-complete-button");
    const trashButton = document.createElement("i");
    trashButton.classList.add("fa-solid");
    trashButton.classList.add("fa-trash");
    trashButton.classList.add("todo-trash-button");
    todoUl.appendChild(todoTopic);
    todoUl.appendChild(completeButton);
    todoUl.appendChild(trashButton);
    todoList.appendChild(todoUl);
  });
}
