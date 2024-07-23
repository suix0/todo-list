import './styles.css';
import createTodo from './createTodo.js';
import { createProject, projectsFactory } from './projects.js';
import { deleteProjectProperty, renderStoredTaskContent } from './storage.js';

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
  // load the tasks in display
  if (localStorage.getItem("tasksDom")) {
    renderStoredTaskContent();
  }

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
        deleteProjectProperty(defaultProjDeleteBtn.getAttribute('data-delete-btn-number'));
        // delete tasks in dom if tasks in display is from project to be deleted
        if (parseInt(projectsFactory.getProjectNumber()) === parseInt(defaultProjDeleteBtn.getAttribute('data-delete-btn-number'))) {
          const tasks = document.querySelectorAll('.task');
          const addTaskBtn = document.querySelector('.addTask');
          [...tasks].forEach(task => {
            task.remove();
          })
          addTaskBtn.remove();
        }
        defaultProj.remove();
        console.log(projectsFactory.getProjects());
      }
    })

  })
})