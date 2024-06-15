import task from "./index.js";
import { openModal, closeModal, displayTasks } from "./dom.js";

// Create logic here to call for a modal to input a tasks' detail
export default function createTodo() {
  const modal = document.querySelector("[data-modal]");
  const taskForm = document.querySelector("form");
  const tasksContainer = document.querySelector(".tasks");

  if (!taskForm.dataset.listenerAdded) {
    taskForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const elements = taskForm.elements;
  
      const taskTitle = elements['taskTitle'].value;
      const taskDescription = elements['taskDescription'].value;
      const taskDueDate = elements['taskDueDate'].value;
      const taskPriority = parseInt(elements['taskPriority'].value);
  
      const newTask = task(taskTitle, taskDescription, taskDueDate, taskPriority);

      console.log(newTask.description);

      taskForm.reset();
      closeModal(modal);

      displayTasks(tasksContainer, newTask);
    });
    // Mark the form to indicate the listener is added
    taskForm.dataset.listenerAdded = true;
  }

  // Open Modal
  openModal(modal);
}
