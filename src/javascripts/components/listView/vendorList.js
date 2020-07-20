import vendorData from '../../helpers/data/vendorData';

import cardFactoryVendors from '../cardFactory/cardFactoryVendors';

import utils from '../../helpers/utils';

const displayVendors = () => new Promise((resolve, reject) => {
  const collectionNameDiv = $('#collectionName');
  collectionNameDiv.text('Vendors');

  vendorData.getAllVendors().then((response) => {
    const vendorsArr = utils.convertFirebaseCollection(response.data);
    let domString = '<div class="d-flex flex-wrap">';
    vendorsArr.forEach((vendor) => {
      domString += cardFactoryVendors.makeVendorCard(vendor);
    });
    domString += '</div>';

    utils.printToDom('#displayCards', domString);
    resolve();
  })
    .catch((err) => reject(err));
});

export default { displayVendors };
