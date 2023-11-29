// lib/api.js

const API_BASE_URL = 'https://hr-todo.sahda.ir';

export const createTask = async (task) => {
  const response = await fetch(`${API_BASE_URL}/create/task/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/vnd.api+json',
    },
    body: JSON.stringify({ item: task }),
  });

  return response.json();
};

export const getTasks = async () => {
  const response = await fetch(API_BASE_URL);
  console.log("response : " , response)
  return response.json();
};

export const deleteTask = async (id, type) => {
  const response = await fetch(`${API_BASE_URL}/delete.php`, {
    method: 'DELETE',
    body: JSON.stringify({ id, type }),
  });

  return response.json();
};

export const updateTask = async (id, type, sort) => {
  const response = await fetch(`${API_BASE_URL}/update.php`, {
    method: 'PUT',
    body: JSON.stringify({ id, type, sort }),
  });

  return response.json();
};
