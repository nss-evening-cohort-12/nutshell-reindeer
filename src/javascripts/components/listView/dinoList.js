import dinoData from '../../helpers/data/dinoData';

import cardFactory from '../cardFactory/cardFactory';

import utils from '../../helpers/utils';

const displayDinos = () => new Promise((resolve, reject) => {
  const collectionNameDiv = $('#collectionName');
  collectionNameDiv.text('Dinosaurs');

  dinoData.getDinos().then((response) => {
    const dinosArr = utils.convertFirebaseCollection(response.data);
    let domString = '<div class="d-flex flex-wrap">';
    dinosArr.forEach((dino) => {
      domString += cardFactory.makeDinoCard(dino);
    });
    domString += '</div>';

    utils.printToDom('#displayCards', domString);
    resolve();
  })
    .catch((err) => reject(err));
});

export default { displayDinos };
