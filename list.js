const inputbox = document.getElementById('inputbox');
const addbtn = document.getElementById('addbtn');
const todolist = document.getElementById('todolist');
let edittodo = null;

const addtodo = ()=>{
    const inputText = inputbox.value.trim();
    if(inputText.length <= 0){
        alert("you must write something in your to do");
        return false;
    }
    if(addbtn.value === "Edit"){
        edittodo.target.previousElementSibling.innerHTML = inputText;
        editlocaltodo(inputText);
        addbtn.value = "Add";
        inputbox.value = "";
    }
    else{
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);


    const editbtn = document.createElement("button");
    editbtn.innerText = "Edit";
    editbtn.classList.add("btn" , "editbtn");
    li.appendChild(editbtn);

    const deletebtn = document.createElement("button");
    deletebtn.innerText = "Remove";
    deletebtn.classList.add("btn" , "deletebtn");
    li.appendChild(deletebtn);


    todolist.appendChild(li);
    inputbox.value = "";

    savelocaltodos(inputText);
} }
const updatetodo = (e)=>{
      if(e.target.innerHTML === "Remove"){
        todolist.removeChild(e.target.parentElement);
        deletelocaltodo(e.target.parentElement);
      }
      if(e.target.innerHTML === "Edit"){
        inputbox.value = e.target.previousElementSibling.innerHTML;
        inputbox.focus();
        addbtn.value = "Edit";
        edittodo = e;
      }
}

const savelocaltodos = (todo) =>{
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  }
  else{
  todos = JSON.parse(localStorage.getItem("todos"));
      }
  todos.push(todo);
  localStorage.setItem("todos" , JSON.stringify(todos));
}

const getlocaltodos = () =>{
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  }
  else{
  todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach(todo => {

    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = todo;
    li.appendChild(p);


    const editbtn = document.createElement("button");
    editbtn.innerText = "Edit";
    editbtn.classList.add("btn" , "editbtn");
    li.appendChild(editbtn);

    const deletebtn = document.createElement("button");
    deletebtn.innerText = "Remove";
    deletebtn.classList.add("btn" , "deletebtn");
    li.appendChild(deletebtn);


    todolist.appendChild(li);
  });
  }
}

const deletelocaltodo = (todo)=>{
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  }
  else{
  todos = JSON.parse(localStorage.getItem("todos"));
      }
      let todoText = todo.children[0].innerHTML;
      let todoIndex = todos.indexOf(todoText);
      todos.splice(todoIndex, 1);
      localStorage.setItem("todos" , JSON.stringify(todos));
}
const editlocaltodo = (todo)=>{
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputbox.value;
    localStorage.setItem("todos" ,JSON.stringify(todos));
}
document.addEventListener('DOMContentLoaded', getlocaltodos);
addbtn.addEventListener('click',addtodo);
todolist.addEventListener('click',updatetodo);

