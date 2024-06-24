import task from "./index.js";
import { openModal, closeModal, displayTasks } from "./dom.js";
import editTodo from "./editTodo.js";

const modal = document.querySelector("[data-modal]");
const taskForm = document.querySelector("form");
const tasksContainer = document.querySelector(".tasks");

// Create logic here to call for a modal to input a tasks' detail
export function formAddTaskDetails(event) {
  event.preventDefault();

  const elements = taskForm.elements;

  const taskTitle = elements['taskTitle'].value;
  const taskDescription = elements['taskDescription'].value;
  const taskDueDate = elements['taskDueDate'].value;
  const taskPriority = parseInt(elements['taskPriority'].value);

  const newTask = task(taskTitle, taskDescription, taskDueDate, taskPriority);

  taskForm.reset();
  closeModal(modal);

  displayTasks(tasksContainer, newTask);
  editTodo();
}

export default function createTodo() {
  openModal(modal);
  if (!taskForm.dataset.listenerAdded) {
    taskForm.addEventListener('submit', formAddTaskDetails);
  }
  taskForm.dataset.listenerAdded = true;
}
