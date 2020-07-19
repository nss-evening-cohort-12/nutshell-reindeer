import cardFactoryEquip from '../cardFactoryEquip/cardFactoryEquip';

import utils from '../../helpers/utils';
import equipData from '../../helpers/data/equipData';

const displayEquipCollection = () => new Promise((resolve, reject) => {
  const collectionNameDiv = $('#collectionName');
  collectionNameDiv.text('Equipment');

  equipData.getAllEquipment().then((response) => {
    const equipCollectionArr = utils.convertFirebaseCollection(response.data);
    let domString = '<div class="d-flex justify-content-center flex-wrap">';
    equipCollectionArr.forEach((equip) => {
      domString += cardFactoryEquip.makeSingleEquipCard(equip);
    });
    domString += '</div>';

    utils.printToDom('#displayCards', domString);
    resolve();
  })
    .catch((err) => reject(err));
});

export default { displayEquipCollection };
