import cardFactoryRide from '../cardFactory/cardFactoryRide';

import utils from '../../helpers/utils';
import rideData from '../../helpers/data/rideData';

const displayRides = () => new Promise((resolve, reject) => {
  const collectionNameDiv = $('#collectionName');
  collectionNameDiv.text('Rides');

  rideData.getAllRides().then((response) => {
    const ridesArr = utils.convertFirebaseCollection(response.data);
    let domString = '<div class="d-flex justify-content-center flex-wrap">';
    ridesArr.forEach((ride) => {
      domString += cardFactoryRide.makeSingleRideCard(ride);
    });
    domString += '</div>';

    utils.printToDom('#displayCards', domString);
    resolve();
  })
    .catch((err) => reject(err));
});

export default { displayRides };
