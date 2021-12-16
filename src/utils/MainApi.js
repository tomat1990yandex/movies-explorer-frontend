import { BASE_URL } from "./constants";

const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`${res.status}`)
};

export const register = (name, email, password) => {
  return fetch (`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
    },
    body: JSON.stringify({ name, email, password })
  })
    .then((res) => getResponse(res));
};

export const login = (email, password) => {
  return fetch (`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => getResponse(res));
};

export const checkAuth = (token) => {
  return fetch (`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    .then((res) => getResponse(res));
};

export const updateProfile = (username, email) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      name: username,
      email: email,
    }),
  })
    .then((res) => getResponse(res));
};
