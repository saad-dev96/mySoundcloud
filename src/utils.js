export function setItem(key, value){
  localStorage.setItem(key, value);
}

export function removeItem(key){
  localStorage.removeItem(key);
}

export function getItem(key){
  return localStorage.getItem(key);
}

export function getTime(time) {
  if (!isNaN(time)) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }
}