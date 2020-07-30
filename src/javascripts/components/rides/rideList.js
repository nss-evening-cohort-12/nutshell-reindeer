import utils from '../../helpers/utils';
import rideData from '../../helpers/data/rideData';
import checkUser from '../../helpers/data/checkUser';
import './rideList.scss';
import header from '../consoleHeader/consoleHeader';
import addButton from '../addButton/addButton';

const addRideForm = () => {
  const domString = `
  <div class="modal" id="addRideModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">New Ride</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
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
    <button type-"submit" class="btn btn-primary">Build!</button>
  </form>
  </div>
    </div>
  </div>
</div>`;
  return domString;
};

// Checks for Rides that have no assigned staff and hides all others

const unattendedRides = (e) => {
  rideData.getRidesWithAssignees()
    .then((rides) => {
      if (e.target.checked === true) {
        rides.forEach((ride) => {
          if (ride.assignees.length > 0) {
            $(`#${ride.id}`).closest('.card').addClass('hide-assigned');
          }
        });
      } else if (e.target.checked === false) {
        $('.card').removeClass('hide-assigned');
      }
    })
    .catch((err) => console.error('Getting assignees for rides did not work -> ', err));
};

const displayRides = () => {
  header.headerBuilder('Rides');
  if (checkUser.checkUser()) {
    utils.printToDom('#addForm', addRideForm());
    addButton.buttonDiv('Build New Ride');
  }
  rideData.getRidesWithAssignees()
    .then((ridesArr) => {
      let domString = `
        <div class="form-check unassigned-box">
          <input class="form-check-input" type="checkbox" value="" id="unattended-rides">
          <label class="form-check-label" for="unattended-rides">
            See Unattended Rides
          </label>
        </div>
        <div class="cardCollection">
      `;
      ridesArr.forEach((ride) => {
        let assignees = 'unassigned';
        if (ride.assignees.length > 0) {
          assignees = '';
          ride.assignees.forEach((assignee) => {
            assignees += `<p>${assignee.name}`;
          });
        }
        domString += `<div id="${ride.id}" class="card align-items-center m-3" style="width: 18rem; background-color:${ride.rideOperational ? '' : 'red'};">
        <img src="${ride.rideImgUrl}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Ride Name: ${ride.name}</h5>
          <p class="card-text">Ride Type: ${ride.rideType}</p>
          <p class="card-text">Ride Location: ${ride.rideLocation}</p>
          <p class="card-text">Operational: <i class="fas fa-thumbs-${ride.rideOperational ? 'up' : 'down'}" style="color:${ride.rideOperational ? 'green' : 'black'};"></i></p>
          <p class="card-text">Assigned to: 
            ${assignees}</p>`;
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
      utils.setState('rides');
    })
    .catch((err) => console.error(err));
};

const addRide = (e) => {
  e.preventDefault();
  const tempRideObj = {
    name: e.target.elements.addRideName.value,
    rideType: e.target.elements.addRideType.value,
    rideImgUrl: e.target.elements.addRideImgUrl.value,
    rideLocation: e.target.elements.addRideLocation.value,
    rideOperational: true,
  };
  rideData.addRide(tempRideObj).then(() => {
    $('#addRideModal').modal('toggle');
    displayRides();
  });
};

const deleteRide = (e) => {
  e.preventDefault();
  const collectionId = e.target.closest('.card').id;
  rideData.deleteRideById(collectionId)
    .then(() => {
      displayRides();
    })
    .catch((err) => console.error(err));
};

export default {
  displayRides,
  addRide,
  deleteRide,
  unattendedRides,
};
