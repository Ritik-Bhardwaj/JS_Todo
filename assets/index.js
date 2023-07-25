// Selector
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event listenrs
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


// Function

function addTodo(event){
    // Prevent form from submit
    event.preventDefault();

    // Create todo dive
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo")

    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText= todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //ADD TODO TO LOCAL STORAGE
    saveLocalTodo(todoInput.value);

    //Check button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"> </i>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);
    

    // delete Button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);

    // Append to List
    todoList.appendChild(todoDiv);

    // Clear todo Input
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    //Delete TODO
    if( item.classList[0] === "delete-btn"){
        const todo = item.parentElement;
        // Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
       todo.addEventListener('transitioned', function(){
        todo.remove();
       });
    }

    // Check Mark
    if( item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
      switch(e.target.value){
        case "all":
         todo.style.display = 'flex';
        break;
        case "completed":
        if(todo.classList.contains('completed')){
            todo.style.display ='flex';
        }
        else{
            todo.style.display ="none";
        }
        break;
        case "uncompleted":
            if(!todo.classList.contains('completed')){
                todo.style.display ='flex';
        }
        else{
            todo.style.display ="none";
        }
         break;   
      }
    });
}

function saveLocalTodo(todo){
    //Check ---I already have thing is there
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.getItem("todos", JSON.stringify(todos));

}

function getTodos(){
     //Check ---I already have thing is there
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        // Create todo dive
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo")

    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText= todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
   

    //Check button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"> </i>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);
    

    // delete Button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);

    // Append to List
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
     //Check ---I already have thing is there
     let todos;
     if(localStorage.getItem("todos") === null){
         todos = [];
     }
     else{
         todos = JSON.parse(localStorage.getItem("todos"));
     }
     const todoIndex = todo.children[0].innerText;
     todos.splice(todos.indexOf(todoIndex),1);
     localStorage.setItem("todos", JSON.stringify(todos));
}