import { createAddProjectForm, openModal, closeModal } from "./dom";

// Create a projects factory
const projectsFactory = (() => {
  let projects = {
    "0": "",
    };

  function addTaskToProject(projectNumber, task) {
    projects[projectNumber] = task;
  }

  function addProject(projectNumber) {
    projects[projectNumber] = "";
  }

  function getProjects() {
    return projects;
  }

  return { addTaskToProject, addProject, getProjects }; 
})()

let i = 1;
// Make a function to add a project
export default function createProject() {
  createAddProjectForm();
  const projectContainer = document.querySelector("ul");
  const form = document.querySelector('form');
  const modal = document.querySelector('dialog');

  openModal(modal);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formElements = form.elements;

    const projectTitleName = formElements.projectName.value;

    // create and append the project to the container;
    const project = document.createElement("li");
    project.textContent = projectTitleName;
    project.setAttribute('data-project-number', i);
    projectContainer.appendChild(project);

    // Add newly created object to the projects object in the project factory
    projectsFactory.addProject(String(i));

    console.log(projectsFactory.getProjects());

    i++;
    closeModal(modal);
    form.remove();
    modal.remove();
  });
}

