import './styles.css';
import createTodo from './createTodo.js';
import createProject from './projects.js';
import { projectsFactory } from './projects.js';

export default function task(title, description, dueDate, priority, taskNumber) {
  let newTitle = "";
  
  if (priority === 3) {
    newTitle += `!!! ${title}` // High
  } else if (priority === 2) {
    newTitle += `!! ${title}` // Medium Priority
  } else if (priority === 1 ) {
    newTitle += `! ${title}` // Low Priority
  } else {
    return { title, description, dueDate, priority, taskNumber, getTaskNumber }
  }
  title = newTitle;

  function getTaskNumber() {
    return taskNumber
  }

  return { title, description, dueDate, priority, taskNumber, getTaskNumber }
}

document.addEventListener('DOMContentLoaded', () => {
  const addTaskBtn = document.querySelector(".addTask");
  addTaskBtn.addEventListener("click", createTodo);  

  const addProjBtn = document.querySelector('.addProject');
  addProjBtn.addEventListener('click', createProject);

  const defaultProj = document.querySelector('[data-project-number="0"]');
  const defaultProjSpan = document.querySelector('.defaultSpan');
  projectsFactory.setProjectNumber(defaultProj, defaultProjSpan);

  const defaultProjDeleteBtn = document.querySelector('[data-delete-btn-number="0"]');
  
  defaultProjDeleteBtn.addEventListener('click', () => {
    console.log(projectsFactory.getProjects());
    Object.keys(projectsFactory.getProjects()).forEach(projects => {
      if (projects === defaultProjDeleteBtn.getAttribute('data-delete-btn-number')) {
        delete projectsFactory.getProjects()[projects];
        defaultProj.remove();
        console.log(projectsFactory.getProjects());
      }
    })
  })
})