import task from "./index.js";
import { openModal, formHandling } from "./dom.js";


// Create logic here to call for a modal to input a tasks' detail
export default function createTodo() {
  const modal = document.querySelector("[data-modal]");
  const taskForm = document.querySelector("form");

  // Open Modal
  openModal(modal);

  // Function to process form's input
  formHandling(taskForm, modal);
}
