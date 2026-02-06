const fs = require("fs");
const readTodo = function(){
    const data = fs.readFileSync("c:/Users/HP/OneDrive/Desktop/Backend/BACKEND/Assingment/Assig_1/todo.json" , "utf-8");
    return JSON.parse(data);
}
const writeTodos = function(newTodos){
    const data = fs.writeFileSync("c:/Users/HP/OneDrive/Desktop/Backend/BACKEND/Assingment/Assig_1/todo.json" , JSON.stringify(newTodos) );
    
}
function addTodo(task){
    const currentTodos = readTodo();
    const newTodo = {
        task : task,
        id : Date.now(),
        status : false,
    }
    currentTodos.push(newTodo);
    writeTodos(currentTodos);
}

addTodo("Say hi to class!");