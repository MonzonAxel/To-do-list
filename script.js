const fecha = document.querySelector(".fecha");
const input = document.querySelector(".input");
const add = document.querySelector(".fa-circle-plus");
const ul = document.querySelector(".mainList");
const button = document.querySelector(".allEliminate")

const MAX_CHARACTERS = 27;
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough= "line-through"

let LIST 
let count = 0;


// Fecha y hora actual

const getDateAndTime = () => {
    const now = new Date();
    const options = {
        timeZone: 'America/Argentina/Buenos_Aires',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    return now.toLocaleString('es-AR', options);
};


const updateDateAndTime = () => {
    const currentDateTime = getDateAndTime();
    fecha.textContent = currentDateTime;
};

updateDateAndTime();

setInterval(updateDateAndTime, 1000)


//Restriccion en los inputs

const charactersRestriction = (input) =>{
    if (input.value.length > MAX_CHARACTERS) {
        input.value = input.value.slice(0, MAX_CHARACTERS);
    }
}

// Insertar la tarea

const addTask = (task,count,circle,trash) =>{

    if(trash) return

    let state = circle ? check : uncheck;
    let line = circle ? lineThrough : ""

    const element = `<li class="li">
                        <i class="far ${state}" data="sucess" count="${count}"></i>
                        <span class="task-text ${line}">${task}</span>
                        <input type="text" class="edit-input" hidden">
                        <i class="fa-solid fa-edit" data="edit" count="${count}"></i>
                        <i class="fa-solid fa-trash" data="delete" count="${count}"></i>
                    </li>`
    ul.insertAdjacentHTML("beforeend",element)
}

// Obtener la tarea

const setTask = () =>{
    const task = input.value
    if(!task) return alert("Debe insertar una tarea")

    addTask(task,count,false,false)
    LIST.push({
        nombre:task,
        count:count,
        circle:false,
        trash:false
    })
    localStorage.setItem("Array",JSON.stringify(LIST))
    input.value=""
    count ++

} 

// Cambiar estado de la clase

const taskDone = (element) =>{

    const incremental = element.getAttribute("count")
    const taskText = element.parentNode.querySelector(".task-text")
    taskText.classList.toggle(lineThrough)

    element.classList.toggle(uncheck)
    element.classList.toggle(check)
    
    
    LIST[incremental].circle = LIST[incremental].circle ? false : true

    
}

// Eliminar el elemento seleccionado

const taskDelete = (element) =>{
    const incremental = element.getAttribute("count")
    element.parentNode.remove()
    LIST[incremental].trash = true;
}

// Editar la tarea seleccionada

const handleEditKeyPress = (e, taskText, editInput, incremental) => {
    if (e.key === 'Enter') {
        const newTask = editInput.value.trim()
        if (newTask !== "") {
            taskText.textContent = newTask
            LIST[incremental].nombre = newTask
            localStorage.setItem("Array", JSON.stringify(LIST))
        }
        taskText.classList.remove("hidden")
        editInput.classList.remove("visible")
        editInput.classList.add("hidden")
    }
}

// Iniciar tarea a modificar

const taskEdit = (element) => {
    const incremental = element.getAttribute("count")
    const taskText = element.parentNode.querySelector(".task-text")
    const editInput = element.parentNode.querySelector(".edit-input")

    taskText.classList.add("hidden")
    editInput.classList.remove("hidden")
    editInput.classList.add("visible")
    editInput.value = taskText.textContent
    editInput.focus()

    const editHandler = (e) => handleEditKeyPress(e, taskText, editInput, incremental)

    editInput.addEventListener("keydown", editHandler)

    editInput.addEventListener("input", () => charactersRestriction(editInput))
        
}

// Disparador de tareas

add.addEventListener("click", setTask);

input.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') setTask()
})

ul.addEventListener("click",(e)=>{
    const element = e.target
    const value = element.attributes.data.value
 
    if(value === "sucess") taskDone(element)
    if(value === "delete") taskDelete(element)
    if(value === "edit") taskEdit(element)
        
    localStorage.setItem("Array",JSON.stringify(LIST))
})

input.addEventListener("input", () => charactersRestriction(input))

// Recuperar Storage 

let dataLocal = localStorage.getItem("Array")
if(dataLocal){
    LIST=JSON.parse(dataLocal)
    count = LIST.length
    addList(LIST)
}else{  
    LIST = []
    count = 0
}

function addList(parameter) {
    parameter.forEach(e => {
        addTask(e.nombre, e.count, e.circle, e.trash);
    });
}

// Eliminar todo 

button.addEventListener("click", () => {
    if(!ul.firstChild) return
    localStorage.clear()

    LIST = []
    count = 0

    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    
})