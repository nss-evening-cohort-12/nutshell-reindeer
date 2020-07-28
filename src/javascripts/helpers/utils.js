let state; // variable that holds the current console state

const setState = (newState) => { // sets the console state
  state = newState;
  console.error('current state: ', state);
};

const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const printToDom = (selector, text) => {
  $(selector).html(text);
};

const convertFirebaseCollection = (data) => {
  const objectCollection = data;
  const arrayCollection = [];

  if (objectCollection) {
    Object.keys(objectCollection).forEach((itemId) => {
      objectCollection[itemId].id = itemId;
      arrayCollection.push(objectCollection[itemId]);
    });
  }

  return arrayCollection;
};

const getActive = () => $('.navbar-nav .active').attr('id');

export default {
  printToDom,
  convertFirebaseCollection,
  getActive,
  randomNum,
  setState,
};
