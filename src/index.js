import './styles.css';
import createTodo from './createTodo.js';
import editTodo from './editTodo.js';

export default function task(title, description, dueDate, priority) {
  
  let newTitle = "";
  if (priority === 3) {
    newTitle += `!!! ${title}` // High
  } else if (priority === 2) {
    newTitle += `!! ${title}` // Medium Priority
  } else if (priority === 1 ) {
    newTitle += `! ${title}` // Low Priority
  } else {
    return { title, description, dueDate, priority }
  }
  title = newTitle;
  return { title, description, dueDate, priority }
}

document.addEventListener('DOMContentLoaded', () => {
  const addTaskBtn = document.querySelector(".addTask");
  addTaskBtn.addEventListener("click", createTodo);
  
  editTodo();
})