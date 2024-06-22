const fecha = document.querySelector(".fecha");
const input = document.querySelector(".input");
const add = document.querySelector(".fa-circle-plus");
const ul = document.querySelector(".mainList");

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



// Insertar la tarea

const addTask = (task,count,circle,trash) =>{

    if(trash) return

    let state = circle ? check : uncheck;
    let line = circle ? lineThrough : ""

    const element = `<li class="li ${line}">
                        <i class="far ${state}" data="sucess" count="${count}"></i>
                        ${task}
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

const taskDone = (element,) =>{

    const incremental = element.getAttribute("count")

    element.classList.toggle(uncheck)
    element.classList.toggle(check)
    element.parentNode.classList.toggle(lineThrough)
    
    LIST[incremental].circle = LIST[incremental].circle ? false : true

    
}

// Eliminar el elemento seleccionado

const taskDelete = (element) =>{
    const incremental = element.getAttribute("count")
    element.parentNode.remove()
    LIST[incremental].trash = true;
}


// Disparador de tareas

add.addEventListener("click", setTask);

document.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') setTask()
})

ul.addEventListener("click",(e)=>{
    const element = e.target
    const value = element.attributes.data.value
 
    if(value === "sucess") taskDone(element)
    if(value === "delete") taskDelete(element)
        
    localStorage.setItem("Array",JSON.stringify(LIST))
})

// Restriccion en el input

input.addEventListener("input", () => {
    if (input.value.length > MAX_CHARACTERS) {
        input.value = input.value.slice(0, MAX_CHARACTERS);
    }
});


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
