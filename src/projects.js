import { createAddProjectForm, openModal, closeModal } from "./dom";

// Create an array of tasks
let projects = {
  "0": [],
};

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

    closeModal(modal);
    form.remove();
    modal.remove();
  });
  i++;
}
