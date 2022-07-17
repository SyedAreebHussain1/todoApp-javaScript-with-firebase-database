var list = document.getElementById("list");
// var database = firebase.database().ref("todos")

firebase.database().ref("todos").on("child_added", function (data) {
    // console.log(data.val())

    // create li and textnode
    var li = document.createElement("li");
    var liTxt = document.createTextNode(data.val().val);
    li.appendChild(liTxt);


    // create delete Btn
    var delBtn = document.createElement("button");
    var delTxt = document.createTextNode("DELETE");
    delBtn.appendChild(delTxt);
    delBtn.setAttribute("id", data.val().key)
    delBtn.setAttribute("onclick", "deleteItem(this)");


    // create edit Btn
    var editBtn = document.createElement("button");
    var editTxt = document.createTextNode("EDIT");
    editBtn.appendChild(editTxt);
    editBtn.setAttribute("id", data.val().key)
    editBtn.setAttribute("onclick", "editItem(this)");


    list.appendChild(li);
    li.appendChild(delBtn);
    li.appendChild(editBtn);

})
function addTodo() {
    var todo_item = document.getElementById("todo-item");
    var key = firebase.database().ref("todos").push().key
    // console.log(key)
    var todo = {
        val: todo_item.value,
        key: key
    }
    firebase.database().ref("todos").child(key).set(todo)

    todo_item.value = ""
}
function editItem(e) {
    var val = prompt("Enter Todo", e.parentNode.firstChild.nodeValue);
    var editTodo = {
        value: val,
        key: e.id
    }
    firebase.database().ref("todos").child(e.id).set(editTodo)
    e.parentNode.firstChild.nodeValue = val
}

function deleteItem(e) {
    firebase.database().ref("todos").child(e.id).remove()
    e.parentNode.remove();
}

function deleteAll() {
    firebase.database().ref("todos").remove()
    list.innerHTML = ""
}

