const addNewTaskButton=document.getElementById('addNewTask')
const addOrUpdateTaskButton=document.getElementById('addOrUpdateTask')
const form=document.getElementById('new-task')
const xButton=document.getElementById('x-btn');
const dialog=document.getElementById('close-or-discard-dialog')
const cancelBtn=document.getElementById('cancel-btn')
const discardBtn=document.getElementById('discard-btn')
const inputTitle=document.getElementById('title');
const inputDate=document.getElementById('date');
const inputDescription=document.getElementById('description')
const tasksContainer=document.getElementById('tasks')
tasks=[

]
let currentTask=null;
const reset=()=>{
inputTitle.value="";
inputDate.value="";
inputDescription.value=""
}
const edit=(buttonThis,option=1)=>{
    if(option)
    {form.classList.toggle('hide');
    const object =tasks.find((task)=>{ return task.id===Number(buttonThis.parentElement.id)}
    )
    inputTitle.value=object.title;
    inputDate.value=object.date;
    inputDescription.value=object.description;
    addOrUpdateTaskButton.textContent="Update Task"
    currentTask=object}
    else{
        const objectIndex =tasks.findIndex((task)=>{ return task.id===Number(buttonThis.parentElement.id)})
        tasks.splice(objectIndex,1)
        localStorage.setItem('data',JSON.stringify(tasks))
        buttonThis.parentElement.remove()
        reset()
    }
}
const addOrUpdateTask=()=>{
    if(!(inputTitle.value) && !(inputDate.value) && !(inputDescription.value))
    {
        return 
    }
    if (currentTask===null)
    {
        const object={
            id:Date.now(),
            title:inputTitle.value,
            date:inputDate.value,
            description:inputDescription.value
        }
        tasks.push(object)
    }
    else
    {
        const object =tasks.find((task)=>{ return task.id===currentTask.id})
        object.title=inputTitle.value;
        object.date=inputDate.value;
        object.description=inputDescription.value;
    }
    
    tasksContainer.innerHTML=tasks.map(({id,title,date,description})=>
        `
       <div class="task-container" id="${id}">
        <p ><span  >Title: </span>${title}</p>
        <p><span>Date: </span>${date}</p>
        <p><span>Description: </span>${description}</p>
        <button onclick="edit(this)">Edit</button>
        <button onclick="edit(this,0)">Delete</button>
        </div>
        `
    ).join("");
    localStorage.setItem('data',JSON.stringify(tasks))
    addOrUpdateTaskButton.innerText="Add Task"
    currentTask=null
    reset()
}
addNewTaskButton.addEventListener('click',()=>{
 form.classList.toggle('hide')
})
xButton.addEventListener('click',()=>{
    const formInputsContainValues =inputTitle.value || inputDate.value || inputDescription.value;
    const formInputValuesUpdated = currentTask?.title !==inputTitle.value || currentTask?.date !==inputDate.value || currentTask?.description!==inputDescription.value;
    console.log(currentTask?.title)
    console.log(inputTitle.value,'here look')
    if (formInputValuesUpdated && formInputsContainValues){

        dialog.showModal()
    }
    else
    {
        reset()
        form.classList.toggle('hide')
    }
})
cancelBtn.addEventListener('click',()=>{

    dialog.close()
})
discardBtn.addEventListener('click',()=>{
    
    form.classList.toggle('hide')
    dialog.close()
addOrUpdateTask.innerText="Add Task"
})
addOrUpdateTaskButton.addEventListener('click',(e)=>{
e.preventDefault()
addOrUpdateTask()
form.classList.toggle('hide')
})




