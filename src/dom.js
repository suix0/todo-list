import task from './index.js';
import editTodo from './editTodo.js';

function openModal(modal) {
  modal.show();
}

function closeModal(modal) {
  modal.close();
}

let i = 0;
function displayTasks(container, task) {
  const taskContainer = document.createElement("div");
  editTodo(taskContainer);
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
  
  container.appendChild(taskContainer);
  i++;
}

function editTaskDom(taskNumber, taskToEdit, task) {
  const taskTitleDom = document.querySelector(`.taskTitle${taskNumber}`);
  console.log(taskTitleDom);
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

export { openModal, closeModal, displayTasks, editTaskDom }