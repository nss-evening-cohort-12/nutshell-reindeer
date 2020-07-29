import utils from '../../helpers/utils';

const headerBuilder = (name) => {
  const domString = `<h1 class="collectionHeader">${name}</h1>`;
  utils.printToDom('#collectionName', domString);
};

export default { headerBuilder };
