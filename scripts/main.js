let draggableTodo = null;

function counter() {
  const noStatusCount = document.querySelector("#noStatus").querySelectorAll(".todo");
  document.querySelector("#noStatus").querySelector(".counter").innerHTML = noStatusCount.length;
  
  const notStartedCount = document.querySelector("#notStarted").querySelectorAll(".todo");
  document.querySelector("#notStarted").querySelector(".counter").innerHTML = notStartedCount.length;

  const inProgressCount = document.querySelector("#inProgress").querySelectorAll(".todo");
  document.querySelector("#inProgress").querySelector(".counter").innerHTML = inProgressCount.length;

  const completedCount = document.querySelector("#completed").querySelectorAll(".todo");
  document.querySelector("#completed").querySelector(".counter").innerHTML = completedCount.length;
}

function dragAndDrop() {
  const todos = document.querySelectorAll(".todo");
  const all_status = document.querySelectorAll(".status");

  todos.forEach((todo) => {
    todo.addEventListener("dragstart", dragStart);
    todo.addEventListener("dragend", dragEnd);
  });

  function dragStart() {
    draggableTodo = this;
    setTimeout(() => {
      this.style.display = "none";
    }, 0);
  }

  function dragEnd() {
    draggableTodo = null;
    setTimeout(() => {
      this.style.display = "block";
    }, 0);
    syncStorage();
  }

  all_status.forEach((status) => {
    status.addEventListener("dragover", dragOver);
    status.addEventListener("dragenter", dragEnter);
    status.addEventListener("dragleave", dragLeave);
    status.addEventListener("drop", dragDrop);
  });

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter() {
    this.style.border = "none";
  }

  function dragLeave() {
    this.style.border = "none";
  }

  function dragDrop() {
    this.style.border = "none";
    this.querySelector(".todo-contents").appendChild(draggableTodo);
    counter();
  }
}

fetchStorage();
counter();
dragAndDrop();

function displayModal() {
  const new_todo = document.querySelectorAll("[data-target-modal]");
  const close_modals = document.querySelectorAll(".modal-close");
  const overlay = document.getElementById("overlay");
  new_todo.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelector(btn.dataset.targetModal).classList.add("active");
      overlay.classList.add("active");
    });
  });
  
  close_modals.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      modal.classList.remove("active");
      overlay.classList.remove("active");
    });
  });
  
  window.onclick = (event) => {
    if (event.target == overlay) {
      const modals = document.querySelectorAll(".modal");
      modals.forEach((modal) => modal.classList.remove("active"));
      overlay.classList.remove("active");
    }
  };
}
displayModal();

let parentComp = undefined;
document.getElementById("add-noStatus").addEventListener("click", function() {
  parentComp = document.getElementById("noStatus");
});
document.getElementById("add-notStarted").addEventListener("click", function() {
  parentComp = document.getElementById("notStarted");
});
document.getElementById("add-inProgress").addEventListener("click", function() {
  parentComp = document.getElementById("inProgress");
});
document.getElementById("completed").addEventListener("click", function() {
  parentComp = document.getElementById("completed");
});

let editComponent = undefined;

function eventTodoEdit() {
  document.querySelectorAll(".todo-edit").forEach((value) => {
    value.addEventListener("click", function(e) {
      editComponent = this;
  
      const title_val = editComponent.parentNode.querySelector("h4").innerHTML;
      const body_val = editComponent.parentNode.parentNode.querySelector("pre").innerHTML;
      const title_form = document.getElementById("edit-title");
      const body_form = document.getElementById("edit-body");
  
      title_form.value = title_val;
      body_form.value = body_val;
    })
  });
}
eventTodoEdit();

const todo_edit_submit = document.getElementById("edit-todo");
todo_edit_submit.addEventListener("submit", editTodo);

function editTodo(e) {
  e.preventDefault();
  const title_val = document.getElementById("edit-title").value;
  const body_val = document.getElementById("edit-body").value;

  editComponent.parentNode.querySelector("h4").innerHTML = title_val;
  editComponent.parentNode.parentNode.querySelector("pre").innerHTML = body_val;

  if (overlay) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => modal.classList.remove("active"));
    overlay.classList.remove("active");
  }

  syncStorage();
}

const todo_submit = document.getElementById("form-todo");
todo_submit.addEventListener("submit", createTodo);

function createTodo(e) {
  e.preventDefault();
  const todo_div = document.createElement("div");
  const title_val = document.getElementById("form-title").value;
  const body_val = document.getElementById("form-body").value;

  const section = document.createElement("section");
  section.classList.add("card-head");

  const h4 = document.createElement("h4");
  h4.innerHTML = title_val;

  const i_edit = document.createElement("i");
  i_edit.classList.add("fa", "fa-edit", "todo-edit");
  i_edit.setAttribute("data-target-modal", "#edit-form");

  const i_delete = document.createElement("i");
  i_delete.classList.add("fas", "fa-times", "todo-delete");

  const pre = document.createElement("pre");
  pre.innerHTML = body_val;

  section.append(h4, i_edit, i_delete);

  todo_div.append(section, pre);
  todo_div.classList.add("todo");
  todo_div.setAttribute("draggable", "true");
  
  parentComp.querySelector(".todo-contents").appendChild(todo_div);

  i_delete.addEventListener("click", () => {
    i_delete.parentElement.parentElement.remove();
    syncStorage();
    counter();
  });

  if (overlay) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => modal.classList.remove("active"));
    overlay.classList.remove("active");
  }

  document.getElementById("form-title").value = "";
  document.getElementById("form-body").value = "";

  counter();
  dragAndDrop();
  syncStorage();
  displayModal();
  eventTodoEdit();
}

document.querySelector("#clearAll").addEventListener("click", deleteAll);