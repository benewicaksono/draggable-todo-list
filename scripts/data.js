let noStatusData = [], notStartedData = [], inProgressData = [], completedData = [];

function syncStorage() {
    noStatusData = [];
    document.querySelectorAll("#noStatus .todo").forEach((todoElement) => {
        noStatusData.push({
            title : todoElement.querySelector("h4").innerHTML,
            body : todoElement.querySelector("pre").innerHTML
        })
    });

    notStartedData = []
    document.querySelectorAll("#notStarted .todo").forEach((todoElement) => {
        notStartedData.push({
            title : todoElement.querySelector("h4").innerHTML,
            body : todoElement.querySelector("pre").innerHTML
        })
    });

    inProgressData = []
    document.querySelectorAll("#inProgress .todo").forEach((todoElement) => {
        inProgressData.push({
            title : todoElement.querySelector("h4").innerHTML,
            body : todoElement.querySelector("pre").innerHTML
        })
    });

    completedData = []
    document.querySelectorAll("#completed .todo").forEach((todoElement) => {
        completedData.push({
            title : todoElement.querySelector("h4").innerHTML,
            body : todoElement.querySelector("pre").innerHTML
        })
    });

    localStorage.setItem("todos", JSON.stringify({
        noStatus : noStatusData,
        notStarted : notStartedData,
        inProgress : inProgressData,
        completed : completedData
    }));
}

function fetchStorage() {
    const todoStorage = JSON.parse(localStorage.getItem("todos"));

    if (todoStorage != null) {
        todoStorage.noStatus.forEach((data) => {
            const todo_div = document.createElement("div");
            const title_val = data.title;
            const body_val = data.body;
    
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
            
            document.querySelector("#noStatus .todo-contents").appendChild(todo_div);
    
            i_delete.addEventListener("click", () => {
                i_delete.parentElement.parentElement.remove();
                syncStorage();
            });
        })
    
        todoStorage.notStarted.forEach((data) => {
            const todo_div = document.createElement("div");
            const title_val = data.title;
            const body_val = data.body;
    
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
            
            document.querySelector("#notStarted .todo-contents").appendChild(todo_div);
    
            i_delete.addEventListener("click", () => {
                i_delete.parentElement.parentElement.remove();
                syncStorage();
            });
        })
    
        todoStorage.inProgress.forEach((data) => {
            const todo_div = document.createElement("div");
            const title_val = data.title;
            const body_val = data.body;
    
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
            
            document.querySelector("#inProgress .todo-contents").appendChild(todo_div);
    
            i_delete.addEventListener("click", () => {
                i_delete.parentElement.parentElement.remove();
                counter();
                syncStorage();
            });
        })
    
        todoStorage.completed.forEach((data) => {
            const todo_div = document.createElement("div");
            const title_val = data.title;
            const body_val = data.body;
    
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
            
            document.querySelector("#completed .todo-contents").appendChild(todo_div);
    
            i_delete.addEventListener("click", () => {
                i_delete.parentElement.parentElement.remove();
                syncStorage();
            });
        })
    }
}

function deleteAll() {
    document.querySelectorAll(".todo").forEach((todoElement) => {
        todoElement.remove();
    });
    syncStorage();
    counter();
}