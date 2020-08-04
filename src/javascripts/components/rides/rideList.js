import utils from '../../helpers/utils';
import rideData from '../../helpers/data/rideData';
import checkUser from '../../helpers/data/checkUser';
import './rideList.scss';
import header from '../consoleHeader/consoleHeader';
import addButton from '../addButton/addButton';
import staffData from '../../helpers/data/staffData';

const rideIcon = (type) => {
  let icon = '';
  switch (type) {
    case 'Moving':
      icon = 'fas fa-tram';
      break;
    case 'Exhibit':
      icon = 'fas fa-landmark';
      break;
    case 'Show':
      icon = 'fas fa-theater-masks';
      break;
    default:
      icon = 'fas fa-question';
  }
  return `<i class="${icon} fa-5x text-secondary m-4"></i>`;
};

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
      <label for="addRideType">Type</label>
      <select name="addRideType" class="form-control start-blank">
        <option value="Moving">Moving</option>
        <option value="Exhibit">Exhibit</option>
        <option value="Show">Show</option>
        <option value="Misc">(Other)</option>
      </select>
    </div>


    <button type-"submit" class="btn btn-primary">Save</button>
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
    $('.start-blank').prop('selectedIndex', -1);
    addButton.buttonDiv('Build New Ride');
  }
  rideData.getRidesWithAssignees()
    .then((ridesArr) => {
      let domString = `
        <div class="custom-control custom-switch">
          <input class="custom-control-input" type="checkbox" value="" id="unattended-rides">
          <label class="custom-control-label" for="unattended-rides">
            See Unattended Rides
          </label>
        </div>
        <div class="cardCollection">
      `;
      ridesArr.forEach((ride) => {
        let assignees = '';
        if (ride.assignees.length > 0) {
          for (let i = 0; i < ride.assignees.length; i += 1) {
            assignees += ride.assignees[i].name;
            if (i + 1 < ride.assignees.length && ride.assignees.length !== 1) assignees += ', ';
          }
        }
        domString += `<div id="${ride.id}" class="card ride-card align-items-center m-3" style="background-color:${ride.isOperational ? '' : 'red'};">
        ${rideIcon(ride.type)}
        <div class="card-body">
          <h5 class="card-title">${ride.name}</h5>
          <p class="card-text text-secondary">${ride.type === 'Moving' ? 'Ride' : `${ride.type}`}</p>
          <p class="card-text">Operational: <i class="fas fa-thumbs-${ride.isOperational ? 'up' : 'down'}" style="color:${ride.isOperational ? 'green' : 'black'};"></i></p>
          <p class="card-text">${assignees ? `Assigned to:  ${assignees}` : '<span class="text-danger"><i class="fas fa-exclamation-triangle"></i> currently unassigned</span>'}</p>`;
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
    type: e.target.elements.addRideType.value,
    isOperational: true,
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
      staffData.getStaff(collectionId)
        .then((allStaff) => {
          allStaff.forEach((staff) => {
            if (staff.assignedTo === collectionId) {
              const editedStaff = staff;
              editedStaff.assignedTo = '';
              editedStaff.assignmentCategory = '';

              staffData.updateStaff(staff.id, editedStaff)
                .then(() => {
                  displayRides();
                });
            } else {
              displayRides();
            }
          });
        });
    })
    .catch((err) => console.error(err));
};

export default {
  displayRides,
  addRide,
  deleteRide,
  unattendedRides,
};
