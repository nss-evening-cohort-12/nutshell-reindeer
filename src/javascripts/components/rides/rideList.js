// import cardFactoryRide from './cardFactoryRide';
import utils from '../../helpers/utils';
import rideData from '../../helpers/data/rideData';
import checkUser from '../../helpers/data/checkUser';
import './rideList.scss';

const displayRides = () => {
  $('#collectionName').text('Rides');
  rideData.getAllRides()
    .then((ridesArr) => {
      let domString = '<div class="d-flex justify-content-center flex-wrap">';
      ridesArr.forEach((ride) => {
        domString += `<div id="${ride.id}" class="card align-items-center m-3" style="width: 18rem; background-color:${ride.rideOperational ? '' : 'red'};">
        <img src="${ride.rideImgUrl}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Ride Name: ${ride.rideName}</h5>
          <p class="card-text">Ride Type: ${ride.rideType}</p>
          <p class="card-text">Ride Location: ${ride.rideLocation}</p>
          <p class="card-text">Operational: <i class="fas fa-thumbs-${ride.rideOperational ? 'up' : 'down'}" style="color:${ride.rideOperational ? 'green' : 'black'};"></i></p>`;
        if (checkUser.checkUser()) {
          domString += `
          <div class="links card-text text-center">
            <a href="#" class="editCard mr-4 card-link"><i class="fas fa-pen"></i></a>
            <a href="#" class="deleteCard ml-4 card-link"><i class="far fa-trash-alt"></i></a>
          </div>`;
        }
        domString += `
        </div>
      </div>`;
      });
      domString += '</div>';

      utils.printToDom('#displayCards', domString);
    })
    .catch((err) => console.error(err));
};

export default { displayRides };
