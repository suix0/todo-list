import { createTask, tasksDom, taskCounter } from "./dom";

// function to save  to local storage after new project is made
function storeToLocalStorage(propertyName, object) {
  const serialized = JSON.stringify(object);
  localStorage.setItem(propertyName, serialized);
}

function addNewProjectLocalStorage(projectNum, projectObj) {
  let deserialized = JSON.parse(projectObj);
  deserialized[projectNum] = [];
  
  localStorage.removeItem(projectObj)
  const serialized = JSON.stringify(deserialized);
  localStorage.setItem("projects", serialized)
} 

// save task to local storage after new task is made
function addNewTaskLocalStorage(projectNumber, task) {
  // get the projects obj in local storage
  const obj = localStorage.getItem("projects");

  if (obj === null) {
    let projects = {
      "0": []
    }
    let projectsStringified = JSON.stringify(projects);
    localStorage.setItem("projects", projectsStringified);
  }

  const newObj = localStorage.getItem("projects");
  const newObjParsed = JSON.parse(newObj);

  // convert to object in js and add task
  newObjParsed[projectNumber].push(task); 

  // convert back to string and put it back in local storage
  const serialized = JSON.stringify(newObjParsed);
  localStorage.removeItem(newObj);
  localStorage.setItem("projects", serialized);
  console.log(localStorage.getItem("projects"));
}

function editNewTaskLocalStorage(taskNumber, newTask) {
  let obj = localStorage.getItem("projects");
  let tasksObj = localStorage.getItem("tasksDom");
  
  let deserialized = JSON.parse(obj);

  tasksDom.editTask(taskNumber, newTask);

  Object.keys(deserialized).forEach(key => {
    deserialized[key].forEach(task => {
      if (task.taskNumber === parseInt(taskNumber)) {
        const index = deserialized[key].indexOf(task);
        deserialized[key].splice(index, 1);
        deserialized[key].splice(index, 0, newTask);
      }
    })
  })

  let tasksObjDeserialized = JSON.parse(tasksObj);
  tasksObjDeserialized["taskInDisplay"].forEach(task => {
    if (task.taskNumber === parseInt(taskNumber)) {
      const index = tasksObjDeserialized["taskInDisplay"].indexOf(task);
      tasksObjDeserialized["taskInDisplay"].splice(index, 1);
      tasksObjDeserialized["taskInDisplay"].splice(index, 0, newTask);
    }
  })

  localStorage.removeItem(obj);
  localStorage.removeItem(tasksObj);
  
  let serialized = JSON.stringify(deserialized);
  let taskSerialized = JSON.stringify(tasksObjDeserialized);

  localStorage.setItem("projects", serialized);
  localStorage.setItem("tasksDom", taskSerialized);
}

function deleteTaskLocalStorage(taskNumber) {
  let obj = localStorage.getItem("projects");
  let deserialized = JSON.parse(obj);

  tasksDom.deleteTask(taskNumber);
  
  Object.keys(deserialized).forEach(key => {
    deserialized[key].forEach(task => {
      // if an object in the array has the task number equal to the delete task number, delete the value
      if (task.taskNumber === parseInt(taskNumber)) {
        const index = deserialized[key].indexOf(task);
        deserialized[key].splice(index, 1);
      }
    })
  })
  
  const tasksObj = localStorage.getItem("tasksDom");
  let tasksObjDeserialized = JSON.parse(tasksObj);

  tasksObjDeserialized["taskInDisplay"].forEach(task => {
    if (task.taskNumber === parseInt(taskNumber)) {
      const index = tasksObjDeserialized["taskInDisplay"].indexOf(task);
      tasksObjDeserialized["taskInDisplay"].splice(index, 1);
    }
  })

  localStorage.removeItem(obj);
  localStorage.removeItem(tasksObj);
  
  let serialized = JSON.stringify(deserialized);
  let taskSerialized = JSON.stringify(tasksObjDeserialized);

  localStorage.setItem("projects", serialized);
  localStorage.setItem("tasksDom", taskSerialized);
} 

function deleteProjectProperty(projectNumber) {
  let obj = localStorage.getItem("projects");

  let deserialized = JSON.parse(obj);

  Object.keys(deserialized).forEach(projects => {
    if (projects === projectNumber) {
      delete deserialized[projectNumber];
    }
  })

  let serialized = JSON.stringify(deserialized);

  localStorage.removeItem(obj);

  localStorage.setItem("projects", serialized);
}

function renderStoredTaskContent() {
  const tasks = localStorage.getItem("tasksDom");
  const tasksParsed = JSON.parse(tasks);
  const taskContainer = document.querySelector('.tasks');
  
  tasksParsed["taskInDisplay"].forEach(task => {
    createTask(taskContainer, task, task.taskNumber);
  })
}

// function renderStoredProjectsContent() {
//   const projects = localStorage.getItem("projects");
//   const projectsParsed = JSON.parse(projects);

//   const projectsContainer = document.getElementsByClassName("ul");

// }

function resetTasksDomContent() {
  let tasksDom = localStorage.getItem("tasksDom");
  localStorage.removeItem(tasksDom);

  let tasks = {
    "taskInDisplay": [],
  }

  let tasksSerialized = JSON.stringify(tasks);
  localStorage.setItem("tasksDom", tasksSerialized);
}

export { resetTasksDomContent, editNewTaskLocalStorage, deleteTaskLocalStorage, deleteProjectProperty, storeToLocalStorage, addNewTaskLocalStorage, addNewProjectLocalStorage, renderStoredTaskContent };