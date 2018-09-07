const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';


export function loginUser(userInfo) {
  const url = `${BASE_URL}/user_token`;
  const body = { "auth": userInfo }
  const init = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    mode: 'cors',
    body: JSON.stringify(body),
  }
  return fetch(url, init)
    .then(resp => resp.json())
    .catch(err => {
      throw Error(err);
    });
}

export function registerUser(userInfo) {
  const opts = {
    method: 'POST',
    body: JSON.stringify({ "user": userInfo } ),
    headers: {
      'Content-Type': 'application/json'
    }
  };


  return fetch(`${BASE_URL}/users`, opts)
    .then(resp => resp.json())
    .catch(err => {
      throw Error(err);
    });
}