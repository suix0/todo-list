import task from './index.js';

function openModal(modal) {
  modal.show();
}

function closeModal(modal) {
  modal.close();
}

function displayTasks(container, task) {
  const taskContainer = document.createElement("div");

  const taskTitleDom = document.createElement("h3");
  taskTitleDom.textContent = task.title;
  taskContainer.appendChild(taskTitleDom);

  if (task.description != "") {
    const taskDescriptionDom = document.createElement("p");
    taskDescriptionDom.textContent = task.description;
    taskContainer.appendChild(taskDescriptionDom);
  }
  

  if (task.dueDate != "") {
    const taskDueDateDom = document.createElement("p");
    taskDueDateDom.textContent = task.dueDate;
    taskContainer.appendChild(taskDueDateDom);
  }
  

  container.appendChild(taskContainer);
}

export { openModal, closeModal, displayTasks }