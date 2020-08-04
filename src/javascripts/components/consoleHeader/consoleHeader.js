import utils from '../../helpers/utils';

const headerBuilder = (name) => {
  const domString = `<h1 class="collectionHeader header-font">${name}</h1>`;
  utils.printToDom('#collectionName', domString);
};

export default { headerBuilder };
