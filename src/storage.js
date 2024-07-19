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

  // convert to object in js and add task
  let deserialized = JSON.parse(obj);
  deserialized[projectNumber].push(task); 

  // convert back to string and put it back in local storage
  const serialized = JSON.stringify(deserialized);
  localStorage.removeItem(obj);
  localStorage.setItem("projects", serialized);
  console.log(localStorage.getItem("projects"));
}


export { storeToLocalStorage, addNewTaskLocalStorage, addNewProjectLocalStorage };