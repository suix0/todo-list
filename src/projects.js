import { createAddProjectForm, openModal, closeModal, displayProjects } from "./dom";

// Create a projects factory
export const projectsFactory = (() => {
  let projects = {
    "0": "",
    };

  let projectNumber;

  let projectCount = 1;

  function addTaskToProject(projectNumber, task) {
    projects[projectNumber] = task;
  }

  function addProject(projectNumber) {
    projects[projectNumber] = "";
  }

  function setProjectNumber(project) {
    project.addEventListener('click', () => {
      projectNumber = project.getAttribute('data-project-number');
      console.log(getProjectNumber());
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

