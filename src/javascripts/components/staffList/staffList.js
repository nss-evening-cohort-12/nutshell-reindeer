import staffData from '../../helpers/data/staffData';

import cardFactoryStaff from '../cardFactoryStaff/cardFactoryStaff';

import utils from '../../helpers/utils';

const displayStaff = () => new Promise((resolve, reject) => {
  const collectionNameDiv = $('#collectionName');
  collectionNameDiv.text('Staff');

  staffData.getStaff().then((response) => {
    const staffArr = utils.convertFirebaseCollection(response.data);
    let domString = '<div class="d-flex flex-wrap">';
    staffArr.forEach((staff) => {
      domString += cardFactoryStaff.makeCollectionCard(staff);
    });
    domString += '</div>';

    utils.printToDom('#displayCards', domString);
    resolve();
  })
    .catch((err) => reject(err));
});

export default { displayStaff };
