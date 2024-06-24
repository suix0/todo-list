import { openModal, closeModal, editTaskDom }from './dom.js';
import task from './index.js';
import { formAddTaskDetails } from './createTodo.js';

export default function editTodo() {
  const modal = document.querySelector("[data-modal]");
  const taskForm = document.querySelector("form");
  const tasks = document.querySelectorAll('.task');

  [...tasks].forEach(taskDom => {
    if (!taskDom.dataset.listenerAdded) {
      taskDom.addEventListener('click', () => {
        openModal(modal);
        if (taskForm.dataset.listenerAdded) {
          taskForm.removeEventListener('submit', formAddTaskDetails);
          taskForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const taskNumber = taskDom.getAttribute('data-task-number');
      
            const elements = taskForm.elements;
        
            const taskTitle = elements['taskTitle'].value;
            const taskDescription = elements['taskDescription'].value;
            const taskDueDate = elements['taskDueDate'].value;
            const taskPriority = parseInt(elements['taskPriority'].value);
        
            const newTask = task(taskTitle, taskDescription, taskDueDate, taskPriority);
      
            editTaskDom(taskNumber, newTask);

            taskForm.reset();
            closeModal(modal);
          });
        }
      })
    }
    taskDom.dataset.listenerAdded = "";
  })
}
