"use strict";

const editButton = document.getElementById("edit"); // editButton removeButton upButton downButton colorInput
const addButton = document.getElementById("add");
const removeButton = document.getElementById("remove");
const upButton = document.getElementById("up");
const downButton = document.getElementById("down");
const colorInput = document.getElementById("color");
const colorButton = document.getElementById("colorButton");
const colorDiv = document.getElementById("colorDiv");

const todoList = document.getElementById("todoList");
const tableDiv = document.getElementById("tableDiv");

let SelectedElement;

let todo = JSON.parse(localStorage.getItem('myTodo')) ?? [
    {text: "Встать", done: true, color:"#ffffff"},
    {text: "Сделать зарядку", done: false, color:"#ffffff"},
    {text: "Пойти завтракать", done: false, color:"#ffffff"}
];
render();
hideButtons();


document.addEventListener('change', function updateCheckbox(event) {
    let chk = event.target

    if (chk.tagName === 'INPUT' && chk.type === 'checkbox') {
        todo[chk.parentElement.id].done = chk.checked;
        render();

    }
})

tableDiv.onclick = function selectElement( event){
    let target = event.target;
    if (target.tagName === 'P' && target.parentElement.parentElement.id === 'todoList'){
        if (SelectedElement === target){
            SelectedElement.classList.remove('selected');
            SelectedElement = null;
            hideButtons();
            return;

        } else {
            if(SelectedElement!=null){
                SelectedElement.classList.remove('selected');
                hideButtons();
            }
            SelectedElement = target;
            target.classList.add('selected');
            showButtons();
        }
    }


}

colorButton.onclick = function setColor(){
    SelectedElement.style.color =colorInput.value;
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
    hideButtons();
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
function hideButtons(){
    //editButton removeButton upButton downButton colorInput
    editButton.style.display = 'none';
    removeButton.style.display = 'none';
    downButton.style.display = 'none';
    upButton.style.display = 'none';
    //colorInput.style.display = 'none';
    //colorButton.style.display = 'none';
    colorDiv.style.display = 'none';
}
function showButtons(){
    //editButton removeButton upButton downButton colorInput
    editButton.style.display = 'block';
    removeButton.style.display = 'block';
    downButton.style.display = 'block';
    upButton.style.display = 'block';
    //colorInput.style.display = 'block';
    colorDiv.style.display = 'block';
}

