"use strict";

const editButton = document.getElementById("edit");
const addButton = document.getElementById("add");
const removeButton = document.getElementById("remove");
const upButton = document.getElementById("up");
const downButton = document.getElementById("down");

const todoList = document.getElementById("todoList");
const tableDiv = document.getElementById("tableDiv");

let SelectedElement;

let todo = JSON.parse(localStorage.getItem('myTodo')) ?? [
    {text: "Встать", done: true},
    {text: "Сделать зарядку", done: false},
    {text: "Пойти завтракать", done: false}
];
// let todo=[
//     {text: "Встать", done: true},
//     {text: "Сделать зарядку", done: false},
//     {text: "Пойти завтракать", done: false}
// ]
render();

document.addEventListener('change', function updateCheckbox(event) {
    let chk = event.target

    if (chk.tagName === 'INPUT' && chk.type === 'checkbox') {
        todo[chk.parentElement.id].done = chk.checked;
        render();
    }
})



tableDiv.onclick = function addItem( event){
    let target = event.target;
    if (target.tagName === 'P' && target.parentElement.parentElement.id === 'todoList'){
        if (SelectedElement === target){
            SelectedElement.classList.remove('selected');
            SelectedElement = null;
            return;

        } else {
            if(SelectedElement!=null){
                SelectedElement.classList.remove('selected');
            }
            SelectedElement = target;
            target.classList.add('selected');

        }
    }


}


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

editButton.onclick = function editItem() {
    let inputText = prompt("Редактирование задачи", "");
    let text;
    if (inputText == null || inputText == "") {


    } else {
        editSelectedText(inputText);
    }
}

removeButton.onclick = function removeItem(){
    removeSelected();
}
downButton.onclick = function removeItem(){
    moveSelectedRight();
}
upButton.onclick = function removeItem(){
    moveSelectedLeft();
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
    localStorage.setItem('myTodo', JSON.stringify(todo));
}
function renderMove(){
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
        if(SelectedElement.innerText === todo[i].text){
            addToLi.classList.add('selected');

        }
        addToLi.id = i;
        todoList.append(addToLi);
    }
    localStorage.setItem('myTodo', JSON.stringify(todo));
}

function updateCheckboxData(){
    for (let i = 0; i<todo.length; i++){
        let item = document.getElementById("item"+i);

    }
}

function removeSelected(){

    if(SelectedElement != null){
        todo.splice(SelectedElement.parentElement.id, 1);
        render();
        SelectedElement = null;
    } else {
        alert("Сначала выделите элемент");
    }
    render();
}

function editSelectedText(text){
    if(SelectedElement != null){
        let id = Number(SelectedElement.parentElement.id);
        todo[id].text = text;
        render();
        SelectedElement = null;
    } else {
        alert("Сначала выделите элемент");
    }
    render();
}
function moveSelectedRight(){
    if(SelectedElement != null){
        let id = Number(SelectedElement.parentElement.id);
        let selected = todo[id];
        let right = todo[id+1];
        if(right != null){
            todo[id] = right;
            todo[id+1] = selected;
        }
        SelectedElement =null;
        render();
    } else {
        alert("Сначала выделите элемент");
    }

}
function moveSelectedLeft(){
    if(SelectedElement != null){
        let id = Number(SelectedElement.parentElement.id);
        let selected = todo[id];
        let left = todo[id-1];
        if(left != null){
            todo[id] = left;
            todo[id-1] = selected;

        }
        SelectedElement =null;
        render();
    } else {
        alert("Сначала выделите элемент");
    }


}


