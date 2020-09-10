export const calculateCall = payload => {
  return fetch("/api/calculator/calculate", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ num: payload }),
  }).then(response => response.json());
};
