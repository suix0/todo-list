import task from './index.js';
import editTask from './editTodo.js';

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function createForm() {
  const form = document.createElement("form");
  const modal = document.createElement("dialog");
  modal.setAttribute('data-modal', "");

  // Create input for task title
  const titleAttributes = {
    'type': 'text',
    'id': 'taskTitle',
    'name': 'taskTitle',
    'required': ''
  }
  const titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "taskTitle");
  titleLabel.textContent = "Title";

  const titleInput = document.createElement("input");
  setAttributes(titleInput, titleAttributes);
  form.appendChild(titleLabel);
  form.appendChild(titleInput);

  // Create input for task description
  const descriptionAttributes = {
    'id': 'taskDescription',
    'name': 'taskDescription',
    'rows': 10,
    'cols': 50
  }
  const descriptionLabel = document.createElement("label");
  descriptionLabel.setAttribute("for", "taskDescription");
  descriptionLabel.textContent = "Description";

  const descriptionInput = document.createElement("textArea");
  setAttributes(descriptionInput, descriptionAttributes);
  form.appendChild(descriptionLabel);
  form.appendChild(descriptionInput);

  // Create input for task due date
  const dueDateAttributes = {
    'type': 'datetime-local',
    'id': 'taskDueDate',
    'name': 'taskDueDate',
  }
  const dueDateLabel = document.createElement("label");
  dueDateLabel.setAttribute("for", "taskDueDate");
  dueDateLabel.textContent = "Due Date";

  const dueDateInput = document.createElement("input");
  setAttributes(dueDateInput, dueDateAttributes);
  form.appendChild(dueDateLabel);
  form.appendChild(dueDateInput);

  // Create input for task priority
  const priorities = ["None", "Low", "Medium", "High"];

  const selectPriorityLabel = document.createElement('label');
  selectPriorityLabel.setAttribute('for', 'taskPriority');
  selectPriorityLabel.textContent = "Priority";

  const selectPriority = document.createElement('select');
  const selectPriorityAttributes = {'id': 'taskPriority', 'name': 'taskPriority'};
  setAttributes(selectPriority, selectPriorityAttributes);

  for (let i = 0; i < priorities.length; i++) {
    const priorityOptions = document.createElement("option");
    priorityOptions.setAttribute("value", i);
    priorityOptions.textContent = priorities[i];
    selectPriority.appendChild(priorityOptions);
  }
  form.appendChild(selectPriorityLabel);
  form.appendChild(selectPriority);

  // Create submit button
  const submitBtn = document.createElement("button");
  submitBtn.setAttribute("type", "submit")
  submitBtn.textContent = "Submit";
  form.appendChild(submitBtn);

  form.action = "#";

  modal.appendChild(form);
  document.body.appendChild(modal);
} 


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
  
  if (task.description !== "") {
    const taskDescriptionDom = document.createElement("p");
    taskDescriptionDom.classList.add(`taskDescription${i}`);
    taskDescriptionDom.textContent = task.description;
    taskContainer.appendChild(taskDescriptionDom);
  }
  
  if (task.dueDate !== "") {
    const taskDueDateDom = document.createElement("p");
    taskDueDateDom.classList.add(`taskDueDate${i}`);
    taskDueDateDom.textContent = task.dueDate;
    taskContainer.appendChild(taskDueDateDom);
  }
  
  editTask(taskContainer);
  container.appendChild(taskContainer);
  i++;
}

function editTaskDom(taskToEdit, taskNumber, task) {
  const taskTitleDom = document.querySelector(`.taskTitle${taskNumber}`);
  taskTitleDom.textContent = task.title;

  if (task.description !== "") {
    const taskDescriptionDom = document.querySelector(`.taskDescription${taskNumber}`);
    if (taskDescriptionDom === null) {
      const newTaskDescriptionDom = document.createElement("p");
      newTaskDescriptionDom.classList.add(`taskDescription${taskNumber}`)
      newTaskDescriptionDom.textContent = task.description;
      taskToEdit.appendChild(newTaskDescriptionDom);
    } else {
      taskDescriptionDom.textContent = task.description;
    }
  }

  if (task.dueDate !== "") {
    const taskDueDateDom = document.querySelector(`.taskDueDate${taskNumber}`);
    if (taskDueDateDom === null) {
      const newTaskDueDateDom = document.createElement("p");
      newTaskDueDateDom.classList.add(`taskDueDate${taskNumber}`);
      newTaskDueDateDom.textContent = task.dueDate;
      taskToEdit.appendChild(newTaskDueDateDom);
    } else {
      taskDueDateDom.textContent = task.dueDate;
    }
  }
}

export { createForm, openModal, closeModal, displayTasks, editTaskDom }