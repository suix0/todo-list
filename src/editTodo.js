import { openModal, closeModal, createForm, editTaskDom } from './dom.js';
import task from './index.js';

export default function editTask(taskToEdit) {
  // add event listener to the taskToEdit to open the form
  if (!taskToEdit.dataset.listenerAdded) {
    taskToEdit.addEventListener('click', () => {
      // create and open the form
      createForm();
    
      const editTaskForm = document.querySelector('form');
      const modal = document.querySelector('dialog');
      openModal(modal);

      // add event listener to form upon submit
      editTaskForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const taskNumber = taskToEdit.getAttribute('data-task-number');

        // get the values that user inputs
        const elements = editTaskForm.elements;

        const taskTitle = elements.taskTitle.value;
        const taskDescription = elements.taskDescription.value;
        const taskDueDate = elements.taskDueDate.value;
        const taskPriority = parseInt(elements.taskPriority.value);

        // edit the taskToEdit's details
        const newTask = task(taskTitle, taskDescription, taskDueDate, taskPriority);

        // remove the form and modal
        editTaskForm.remove();
        modal.remove();

        editTaskDom(taskToEdit, taskNumber, newTask);

      })
    })
  }
  taskToEdit.dataset.listenerAdded = true;
}