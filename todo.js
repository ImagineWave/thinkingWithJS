"use strict";

const editButton = document.getElementById("edit");
const addButton = document.getElementById("add");
const removeButton = document.getElementById("remove");
const upButton = document.getElementById("up");
const downButton = document.getElementById("down");

const todoList = document.getElementById("todoList");

let SelectedID;
let todo=[
    {text: "Встать", done: true},
    {text: "Сделать зарядку", done: false},
    {text: "Пойти завтракать", done: false}
]
render();

document.addEventListener('change', function updateCheckbox(event) {
    let chk = event.target

    if (chk.tagName === 'INPUT' && chk.type === 'checkbox') {
        todo[chk.parentElement.id].done = chk.checked;
    }
})

document.addEventListener('click', function select(event) {
    let chk = event.target
    console.log(chk);
    if (chk.tagName === 'P' && chk.parentElement.id === 'todoList') {
        SelectedID = chk.parentElement.id;
        chk.parentElement.classList.add('selected');
    }
})


addButton.onclick = function addItem() {
    let inputText = prompt("Добавление новой цели", "");
    let text;
    if (inputText == null || inputText == "") {
        text = "Вы не стали ставить себе цель!";
        alert(text);

    } else {
        todo[todo.length] = {
            text: inputText,
            done: false
        }
        render();

    }
}

removeButton.onclick = function removeItem(){
    removeChecked();
}
function render(){
    todoList.replaceChildren();
    for(let i = 0; i<todo.length; i++){
        let addToLi = document.createElement('li');
        let text = "";
        let checked = "";
        if(todo[i].done){
            checked ="checked";
        }

        text = text+("<p>"+todo[i].text+"</p>");
        text = text+("<input type='checkbox' "+checked+" id='"+i+"'>");

        addToLi.innerHTML = text;
        addToLi.id = i;
        todoList.append(addToLi);
    }
}
function updateCheckboxData(){
    for (let i = 0; i<todo.length; i++){
        let item = document.getElementById("item"+i);

    }
}

function removeChecked(){
        console.log(todo);
    render();
}


