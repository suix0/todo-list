import task from './index.js';

let tasks = []
function openModal(modal) {
  modal.show();
}

function closeModal(modal) {
  modal.close();
}

function formHandling(form, modal) {
  if (!form.dataset.listenerAdded) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const elements = form.elements;
  
      const taskTitle = elements['taskTitle'].value;
      const taskDescription = elements['taskDescription'].value;
      const taskDueDate = elements['taskDueDate'].value;
      const taskPriority = elements['taskPriority'].value;
  
      const newTask = task(taskTitle, taskDescription, taskDueDate, taskPriority);
  
      tasks.push(newTask);
      console.log(tasks);
  
      form.reset();
      closeModal(modal);
    });
    // Mark the form to indicate the listener is added
    form.dataset.listenerAdded = true;
  }
}

// function displayTasks(tasks) {

// }

export { openModal, closeModal, formHandling }