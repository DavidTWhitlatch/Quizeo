const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';


export function loginUser(userInfo) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // notice the corret url path
  return fetch(`${BASE_URL}/auth/login`, opts)
  .then(resp => resp.json())
  .catch(err => {
    throw Error(err);
  });
}

export function registerUser(userInfo) {
  const opts = {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  // notice the corret url path
  return fetch(`${BASE_URL}/auth/register`, opts)
  .then(resp => resp.json())
  .catch(err => {
    throw Error(err);
  });
}