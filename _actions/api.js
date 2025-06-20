const BASE_URL = 'https://api.qureal.com';
const API_KEY = 'AStMxlulJQjV0GzP7MzK2tOL4Jm9Cqa2';

const handleResponse = async (res) => {
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || 'Request failed');
  }
  const json = await res.json();
  return json.data;
};

export const getItems = async (collection) => {
  const res = await fetch(`${BASE_URL}/items/${collection}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return handleResponse(res);
};

export const createItem = async (collection, data) => {
  const res = await fetch(`${BASE_URL}/items/${collection}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const updateItem = async (collection, id, data) => {
  const res = await fetch(`${BASE_URL}/items/${collection}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const deleteItem = async (collection, id) => {
  const res = await fetch(`${BASE_URL}/items/${collection}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return handleResponse(res);
};
