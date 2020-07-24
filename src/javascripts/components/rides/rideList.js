import utils from '../../helpers/utils';
import rideData from '../../helpers/data/rideData';
import checkUser from '../../helpers/data/checkUser';
import './rideList.scss';

const addRideForm = () => {
  const domString = `
  <form id="addRideForm" class="px-4 py-3">
    <div class="form-group">
      <label for="addRideName">Ride Name</label>
      <input type="text" class="form-control" id="addRideName">
    </div>
    <div class="form-group">
      <label for="addRideType">Ride Type</label>
      <input type="text" class="form-control" id="addRideType">
    </div>
    <div class="form-group">
      <label for="addRideImgUrl">Ride Image URL</label>
      <input type="url" class="form-control" id="addRideImgUrl">
    </div>
    <div class="form-group">
      <label for="addRideLocation">Ride Location</label>
      <input type="text" class="form-control" id="addRideLocation">
      </div>
    <button type-"submit" class="btn btn-primary">Submit</button>
  </form>`;
  return domString;
};

const displayRides = () => {
  $('#collectionName').text('Rides');
  if (checkUser.checkUser()) {
    utils.printToDom('#addForm', addRideForm());
  }
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
            <a href="#" class="editRide mr-4 card-link"><i class="fas fa-pen"></i></a>
            <a href="#" class="deleteRide ml-4 card-link"><i class="far fa-trash-alt"></i></a>
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

const addRide = (e) => {
  e.preventDefault();
  const tempRideObj = {
    rideName: e.target.elements.addRideName.value,
    rideType: e.target.elements.addRideType.value,
    rideImgUrl: e.target.elements.addRideImgUrl.value,
    rideLocation: e.target.elements.addRideLocation.value,
    rideOperational: true,
  };
  rideData.addRide(tempRideObj).then(() => {
    displayRides();
    $('#addForm').addClass('hide');
  });
};

const deleteRide = (e) => {
  e.preventDefault();
  const collectionId = e.target.closest('.card').id;
  rideData.deleteRideById(collectionId)
    .then(() => {
      displayRides();
      $('#addForm').addClass('hide');
    })
    .catch((err) => console.error(err));
};

export default { displayRides, addRide, deleteRide };
