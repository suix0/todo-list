import { createAddProjectForm, openModal, closeModal, displayProjects, createTask, taskCounter } from "./dom";
import createTodo from "./createTodo";

// Create a projects factory
export const projectsFactory = (() => {
  let projects = {
    "0": [],
  };

  let projectNumber = "0";

  let projectCount = 1;

  function addTaskToProject(projectNumber, task) {
    if (projectNumber) {
      projects[projectNumber].push(task)
    }
  }

  function addProject(projectNumber) {
    projects[projectNumber] = [];
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

      [...tasks].forEach(task => {
        task.remove();
      })

      projects[projectNumber].forEach(task => {
        createTask(tasksContainer, task, task.getTaskNumber());
      })

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
export default function createProject() {
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

