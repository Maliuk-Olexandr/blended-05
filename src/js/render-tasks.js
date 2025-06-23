import refs from './refs.js';
import { createTaskItem } from './markup-tasks.js';
import { clearTasksFromLocalStorage } from './local-storage-api.js';

export function renderTasks(tasks) {
  refs.taskList.innerHTML = ''; // Clear the task list before rendering
  if (tasks.length === 0) {
    refs.taskList.innerHTML = '<li class="empty-message">No tasks yet.</li>';
    clearTasksFromLocalStorage();
    return;
  }
  tasks.forEach(task => {
    const taskItem = createTaskItem(task);
    refs.taskList.insertAdjacentHTML('beforeend', taskItem);
  });
}


