import cardFactoryStaff from '../cardFactoryStaff/cardFactoryStaff';

import utils from '../../helpers/utils';

import staffData from '../../helpers/data/staffData';

const displayStaffAfterEditDelete = () => new Promise((resolve, reject) => {
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
    $('.editCard').removeClass('hide');
    $('.deleteCard').removeClass('hide');
    resolve();
  })
    .catch((err) => reject(err));
});

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

export default {
  displayStaff,
  displayStaffAfterEditDelete,
};
