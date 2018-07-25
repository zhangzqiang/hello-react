const set = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify (content);
  }
  window.localStorage.setItem (name, content);
};

const get = name => {
  if (!name) return;
  return window.localStorage.getItem (name);
};

const remove = name => {
  if (!name) return;
  return window.localStorage.removeItem (name);
};

export default {set, get, remove};
