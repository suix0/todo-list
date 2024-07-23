import { createAddProjectForm, openModal, closeModal, displayProjects, createTask, tasksDom, taskCounter } from "./dom";
import createTodo from "./createTodo";
import { storeToLocalStorage, addNewTaskLocalStorage, addNewProjectLocalStorage, resetTasksDomContent } from "./storage";

// Create a projects factory
export const projectsFactory = (() => {
  let projects = {
    "0": [],
  };

  let projectNumber = "0";

  let projectCount = 1;

  function addTaskToProject(projectNumber, task) {
    if (projectNumber) {
      projects[projectNumber].push(task);
      addNewTaskLocalStorage(projectNumber, task);
    }
  }

  function addProject(projectNumber) {
    projects[projectNumber] = [];
    storeToLocalStorage("projects", projects);
    addNewProjectLocalStorage(projectNumber, localStorage.getItem("projects"));
  }

  // when a user clicks on a project, update the current project number
  // and also update the display of tasks matching that specific project's 
  //tasks
  function setProjectNumber(project, projectClickHolder) {
    projectClickHolder.addEventListener('click', () => {
      projectNumber = project.getAttribute('data-project-number');
      console.log(projectNumber);
      
      // remove the current tasks 
      const tasks = document.querySelectorAll('.task');
      const tasksContainer = document.querySelector('.tasks');
      const addTaskBtn = document.querySelector('.addTask');

      if (projectNumber === "0") {
        project.dataset.clicked = true;
        if (project.dataset.clicked === true) {
          resetTasksDomContent();
          project.dataset.clicked = false;
        }
      }
      
      tasksDom.resetTasks();
      [...tasks].forEach(task => {
        task.remove();
      })
      
      tasksDom.resetTasks();

      projects[projectNumber].forEach(task => {
        createTask(tasksContainer, task, task.getTaskNumber());
      })

      console.log(tasksDom.getTasksDomArr());

      if (addTaskBtn === null) {
        const addTaskBtnNew = document.createElement('a');
        addTaskBtnNew.addEventListener("click", createTodo);  
        addTaskBtnNew.textContent = "Add Task";
        addTaskBtnNew.classList.add('addTask');
        tasksContainer.appendChild(addTaskBtnNew);
      }
    })
  }

  function getProjectNumber() {
    return projectNumber;
  }

  function getProjects() {
    return projects;
  }

  function getProjectCount() {
    return projectCount;
  }

  function projectCounterIncrease() {
    projectCount++;
  }

  return { addTaskToProject, addProject, getProjects, getProjectCount, projectCounterIncrease, setProjectNumber, getProjectNumber }; 
})()

// Make a function to add a project
export function createProject() {
  createAddProjectForm();
  const form = document.querySelector('form');
  const modal = document.querySelector('dialog');

  openModal(modal);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formElements = form.elements;

    const projectTitleName = formElements.projectName.value;

    // create and append the project to the container;
    displayProjects(projectTitleName);

    // Add newly created object to the projects object in the project factory
    projectsFactory.addProject(String(projectsFactory.getProjectCount()));

    projectsFactory.projectCounterIncrease();
    closeModal(modal);
    form.remove();
    modal.remove();
  });
}

