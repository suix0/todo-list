import task from './index.js';

function openModal(modal) {
  modal.show();
}

function closeModal(modal) {
  modal.close();
}

let i = 0;
function displayTasks(container, task) {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task");
  taskContainer.dataset.taskNumber = i;

  const taskTitleDom = document.createElement("h3");
  taskTitleDom.classList.add(`taskTitle${i}`);
  taskTitleDom.textContent = task.title;
  taskContainer.appendChild(taskTitleDom);

  if (task.description != "") {
    const taskDescriptionDom = document.createElement("p");
    taskDescriptionDom.classList.add(`taskDescription${i}`);
    taskDescriptionDom.textContent = task.description;
    taskContainer.appendChild(taskDescriptionDom);
  }

  if (task.dueDate != "") {
    const taskDueDateDom = document.createElement("p");
    taskDueDateDom.classList.add(`taskDueDate${i}`);
    taskDueDateDom.textContent = task.dueDate;
    taskContainer.appendChild(taskDueDateDom);
  }

  container.appendChild(taskContainer);
  i++;
}

function editTaskDom(taskNumber, task) {
  const taskTitleDom = document.querySelector(`.taskTitle${taskNumber}`);
  console.log(`taskTitleDom${taskNumber}`);
  taskTitleDom.textContent = task.title;

  const taskDescriptionDom = document.querySelector(`.taskDescription${taskNumber}`);
  taskDescriptionDom.textContent = task.description;

  const taskDueDateDom = document.querySelector(`.taskDueDate${taskNumber}`);
  taskDueDateDom.textContent = task.dueDate;
}

export { openModal, closeModal, displayTasks, editTaskDom }