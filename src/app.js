//Selectors
const todoInput  = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList   = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click',filterTodo);


//Functions


function addTodo(event){
    event.preventDefault();
    //Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //ADD TO LocalStorage
    saveLocalTodos(todoInput.value);
    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<li class="fas fa-check"></li>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<li class="fas fa-trash"></li>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //APPEND LIST
    todoList.appendChild(todoDiv);

    //CLEAR TODO INPUT VALUE
    todoInput.value = '';

    //Create the element and attaching the listener

}

function deleteCheck(e){
    const item = e.target;

    //DELETE TODO
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //ADD ANIMATION
        todo.classList.add('fall');
        removeLocalTodos(todo)
        todo.addEventListener('transitionend',function(){
            todo.remove()
        })
    }

    //CHECK MARK
    if(item.classList[0] === 'complete-btn' ){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}


function filterTodo(e){
    const todos = todoList.childNodes;
    console.log(todos)
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
            break;

            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
            break;

            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
            break;
        }
    })
}

function saveLocalTodos(todo){
    //CHECK --HEY Do I alredy have thing in here
    if(localStorage.getItem('todos')  === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}


function getTodos(){
    let todos;
    if(localStorage.getItem('todos')  === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //Create Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        
        //CHECK MARK BUTTON
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<li class="fas fa-check"></li>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        //TRASH BUTTON
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<li class="fas fa-trash"></li>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
    
        //APPEND LIST
        todoList.appendChild(todoDiv);
    })

}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')  === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}