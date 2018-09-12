const BASE_URL = 'http://localhost:3001';
// process.env.REACT_APP_BASE_URL || 


export function loginUser(userInfo) {
  const body = { "auth": userInfo }
  const init = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    mode: 'cors',
    body: JSON.stringify(body),
  }
  return fetch(`${BASE_URL}/user_token`, init)
    .then(resp => resp.json())
    .catch(err => {
      throw Error(err);
    });
}

export function registerUser(userInfo) {
  const opts = {
    method: 'POST',
    body: JSON.stringify({ "user": userInfo }),
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

export function playlistIndex() {
  return fetch(`${BASE_URL}/playlists`)
    .then(resp => resp.json())
    .catch(err => {
      throw Error(err);
    });
}

export function playlistShow(id) {
  return fetch(`${BASE_URL}/playlists/${id}`)
    .then(resp => resp.json())
    .catch(err => {
      throw Error(err);
    });
}

export function quizzesIndex() {
  return fetch(`${BASE_URL}/quizzes`)
    .then(resp => resp.json())
    .catch(err => {
      throw Error(err);
    });
}

export function userAnswer(userid, id) {
  const opts = {
    method: 'POST',
    body: JSON.stringify({ "data": { "attributes": { "id": id } } }),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return fetch(`${BASE_URL}/users/${userid}/answers/`, opts)
    .then(resp => resp.json())
    .catch(err => {
      throw Error(err);
    });
}

export function destroyPlaylist(id) {
  const opts = {
    method: 'DELETE'
  }

  return fetch(`${BASE_URL}/playlists/${id}`, opts)
    .catch(err => {
      throw Error(err);
    });
}

export function postPlaylist(playlist, id) {
  const opts = {
    method: 'POST',
    body: JSON.stringify({ "data": { "attributes": playlist } }),
    headers: {
      'Content-Type': 'application/json'
    }
  };


  return fetch(`${BASE_URL}/users/${id}/playlists`, opts)
    .then(resp => resp.json())
    .catch(err => {
      throw Error(err);
    });
}

export function updatePlaylist(playlist) {
  const opts = {
    method: 'PUT',
    body: JSON.stringify({ "data": { "attributes": playlist } }),
    headers: {
      'Content-Type': 'application/json'
    }
  };


  return fetch(`${BASE_URL}/playlists/${playlist.id}`, opts)
    .then(resp => resp.json())
    .catch(err => {
      throw Error(err);
    });
}

export function postVideo(video, id) {
  const opts = {
    method: 'POST',
    body: JSON.stringify({ "data": { "attributes": video } }),
    headers: {
      'Content-Type': 'application/json'
    }
  };


  return fetch(`${BASE_URL}/playlists/${id}/videos`, opts)
    .then(resp => resp.json())
    .catch(err => {
      throw Error(err);
    });
}

export function updateVideo(video) {
  const opts = {
    method: 'PUT',
    body: JSON.stringify({ "data": { "attributes": { url: video } } }),
    headers: {
      'Content-Type': 'application/json'
    }
  };


  return fetch(`${BASE_URL}/playlists/${video.id}`, opts)
    .then(resp => resp.json())
    .catch(err => {
      throw Error(err);
    });
}

export function postQuiz(quiz, id) {
  const opts = {
    method: 'POST',
    body: JSON.stringify({ "data": { "attributes": quiz } }),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return fetch(`${BASE_URL}/videos/${id}/quizzes`, opts)
    .then(resp => resp.json())
    .catch(err => {
      throw Error(err);
    });
}

export function updateQuiz(quiz) {
  const opts = {
    method: 'PUT',
    body: JSON.stringify({ "data": { "attributes": quiz } }),
    headers: {
      'Content-Type': 'application/json'
    }
  };


  return fetch(`${BASE_URL}/playlists/${quiz.id}`, opts)
    .then(resp => resp.json())
    .catch(err => {
      throw Error(err);
    });
}

export function postAnswer(id, answer) {
  const opts = {
    method: 'POST',
    body: JSON.stringify({ "data": { "attributes": answer } }),
    headers: {
      'Content-Type': 'application/json'
    }
  };


  return fetch(`${BASE_URL}/quizzes/${id}/answers`, opts)
    .then(resp => resp.json())
    .catch(err => {
      throw Error(err);
    });
}

export function updateAnswer(answer) {
  console.log(answer)
  const opts = {
    method: 'PUT',
    body: JSON.stringify({ "data": { "attributes": answer } }),
    headers: {
      'Content-Type': 'application/json'
    }
  };


  return fetch(`${BASE_URL}/answers/${answer.id}`, opts)
    .then(resp => resp.json())
    .catch(err => {
      throw Error(err);
    });
}
