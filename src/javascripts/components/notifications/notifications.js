import utils from '../../helpers/utils';
import './notifications.scss';
import rideData from '../../helpers/data/rideData';
import equipData from '../../helpers/data/equipData';

const buildNotification = (number) => {
  let domString = '';
  rideData.getAllRides()
    .then((rides) => {
      equipData.getAllEquipment()
        .then((equip) => {
          domString += `
          <div class="dropdown">
            <button type="button" class="btn btn-warning notifications dropdown-toggle" id="dropdownIssueButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Issues <span class="badge badge-light">${number}</span>
              <span class="sr-only">unread messages</span>
            </button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownIssueButton">`;

          rides.forEach((ride) => {
            if (ride.isOperational === false) {
              domString += `
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="${ride.id}">
                  <label class="form-check-label" for="${ride.id}">
                    ${ride.name}
                  </label>
                </div>
              `;
            }
          });
          equip.forEach((oneEquip) => {
            if (oneEquip.isOperational === false) {
              domString += `
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="${oneEquip.id}">
                  <label class="form-check-label" for="${oneEquip.id}">
                    ${oneEquip.name}
                  </label>
                </div>
              `;
            }
          });

          domString += `
            </div>
          </div>
        `;
          utils.printToDom('#notifications', domString);
        });
    })
    .catch((err) => console.error('Getting ride and equipment data did not work -> ', err));
};

const getIssues = () => {
  let rideNumber = 0;
  let equipNumber = 0;

  rideData.getAllRides()
    .then((rides) => {
      equipData.getAllEquipment()
        .then((equip) => {
          rides.forEach((ride) => {
            if (ride.isOperational === false) {
              rideNumber += 1;
            }
          });
          equip.forEach((oneEquip) => {
            if (oneEquip.isOperational === false) {
              equipNumber += 1;
            }
          });
          const number = rideNumber + equipNumber;
          buildNotification(number);
        });
    })
    .catch((err) => console.error('Could not get ride and equipment data for issues -> ', err));
};

export default { getIssues };
