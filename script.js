const date = document.querySelector(".fecha"); //Todavia no lo use
const input = document.querySelector(".input");
const add = document.querySelector(".fa-circle-plus");
const ul = document.querySelector(".mainList");

const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough= "line-through"

let count = 0;


// Inserta la tarea
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

// Obtiene la tarea
const setTask = () =>{
    const task = input.value
    if(!task) return alert("Debe insertar una tarea")
    addTask(task,count,false,false)
    input.value=""
    count ++
} 

// Cambia estado de la clase

const taskDone = (element) =>{
    element.classList.toggle(uncheck)
    element.classList.toggle(check)
    element.parentNode.classList.toggle(lineThrough)
    
}

// Elimina el element

const taskDelete = (element) =>{
    element.parentNode.remove()
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
})

