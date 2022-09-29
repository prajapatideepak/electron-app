export function setToken(key, value) {
  console.log(value);
  localStorage.setItem(key, value);
}

export function getToken(key) {
  let token = localStorage.getItem(key);
  return token;
}

export function handleLogout() {
localStorage.clear();
}
