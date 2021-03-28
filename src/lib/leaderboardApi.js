import { response } from "express";

export const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/d98c5795/scores';

const handleErrors = (response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response
};

export const getScores = (url) => fetch(url)
  .then(handleErrors)
  .then(response => response.json())
  .then(data => {
    if (data.result.length === 0) {
      throw new Error()
    }
    return data.result.sort((x, y) => x.score = y.score);
  });

  export const postScores = (user, score, url) => fetch(url, {
    method: 'Post',
    mode: 'cors',
    headers: 
      {'Content-type': 'application/json'},
    body: JSON.stringify({ user, score }),
  })
  .then(handleErrors);