const setStorage = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify (content);
  }
  window.localStorage.setItem (name, content);
};

const getStorage = name => {
  if (!name) return;
  return window.localStorage.getItem (name);
};

const removeStorage = name => {
  if (!name) return;
  return window.localStorage.removeItem (name);
};

export {setStorage, getStorage, removeStorage};
