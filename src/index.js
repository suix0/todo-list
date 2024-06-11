import './styles.css';
import newTask from './createTodo.js';

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

  return { newTitle, description, dueDate, priority }
}

newTask()