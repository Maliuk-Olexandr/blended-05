// Function to save tasks to local storage
export function saveTasksToLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Function to load tasks from local storage
export function loadTasksFromLocalStorage() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}
// Function to clear tasks from local storage
export function clearTasksFromLocalStorage() {
  localStorage.removeItem('tasks');
}


