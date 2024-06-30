import task from "./index.js";
import { openModal, closeModal, displayTasks, createForm } from "./dom.js";

export default function createTodo() {
  // Dynamically create the form
  createForm();

  const addTaskForm = document.querySelector("form");
  const modal = document.querySelector("dialog");
  const taskContainer = document.querySelector('.tasks');

  // Open the form's modal
  openModal(modal);

  // Add Event Listener to form upon submit
  addTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Save the form input from user and store in variables
    const elements = addTaskForm.elements;
    
    const taskTitle = elements.taskTitle.value;
    const taskDescription = elements.taskDescription.value;
    const taskDueDate = elements.taskDueDate.value;
    const taskPriority = elements.taskPriority.value;
    
    // Create task based on user input
    const newTask = task(taskTitle, taskDescription, taskDueDate, taskPriority);
    displayTasks(taskContainer, newTask);
  
  
    // Close form
    closeModal(modal);
  
    // Remove the Form 
    addTaskForm.remove();
    modal.remove();
  });
  
}

// function submitAddForm(event, taskForm) {
//   event.preventDefault();

//   const taskFormElements = taskForm.elements;

//   const title = taskFormElements.taskTitle;
// }