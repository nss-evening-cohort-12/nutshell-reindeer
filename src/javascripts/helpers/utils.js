const randomNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;

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
};
