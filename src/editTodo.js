import { openModal, closeModal, editTaskDom }from './dom.js';
import task from './index.js';
import { formAddTaskDetails } from './createTodo.js';

export default function editTodo(taskToEdit) {
  const modal = document.querySelector("[data-modal]");
  const taskForm = document.querySelector("form");
  
  taskToEdit.addEventListener('click', () => {
    taskForm.removeEventListener('submit', formAddTaskDetails);
    const taskNumber = taskToEdit.getAttribute('data-task-number');
    openModal(modal);
    if (taskForm.dataset.listenerAdded) {
      taskForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const elements = taskForm.elements;

        const taskTitle = elements['taskTitle'].value;
        const taskDescription = elements['taskDescription'].value;
        const taskDueDate = elements['taskDueDate'].value;
        const taskPriority = parseInt(elements['taskPriority'].value);

        const newTask = task(taskTitle, taskDescription, taskDueDate, taskPriority);

        taskForm.reset();
        closeModal(modal);

        editTaskDom(taskNumber, taskToEdit, newTask);
      })
    }
    taskForm.dataset.listenerAdded = "";
  })
}

