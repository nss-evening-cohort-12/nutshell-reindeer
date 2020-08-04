import utils from '../../helpers/utils';
import rideData from '../../helpers/data/rideData';
import equipData from '../../helpers/data/equipData';
import './notifications.scss';

const updateNotification = (e) => {
  e.preventDefault();
  const formData = e.currentTarget.form;

  rideData.getAllRides()
    .then((rides) => {
      equipData.getAllEquipment()
        .then((equip) => {
          const itemsToFix = [];
          for (let i = 0; i < formData.length; i += 1) {
            if ($(formData[i]).is(':checked')) {
              rides.forEach((ride) => {
                if (formData[i].id === ride.id) {
                  itemsToFix.push(rideData.patchRide(ride.id, { isOperational: true }));
                }
              });
              equip.forEach((oneEquip) => {
                if (formData[i].id === oneEquip.id) {
                  itemsToFix.push(equipData.patchEquipment(oneEquip.id, { isOperational: true }));
                }
              });
            }
          }
          Promise.all(itemsToFix)
            .then(() => {
              // eslint-disable-next-line no-use-before-define
              buildNotification();
            });
        });
    })
    .catch((err) => console.error('Updating the notifications did not work -> ', err));
};

const buildNotification = () => {
  let domString = '';
  let number = 0;

  rideData.getAllRides()
    .then((rides) => {
      equipData.getAllEquipment()
        .then((equip) => {
          domString += `
          <div class="dropdown" data-currentNumber=${number}>
            <button type="button" class="btn btn-warning notifications dropdown-toggle" id="dropdownIssueButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-exclamation-circle"></i> <span class="badge badge-light">${number}</span>
              <span class="sr-only">unread messages</span>
            </button>
            <div class="dropdown-menu dropdown-menu-right notification-dropdown" aria-labelledby="dropdownIssueButton">
              <h5><i class="fas fa-toolbox"></i> Need fixin'</h5>
              <form>`;
          rides.forEach((ride) => {
            if (ride.isOperational === false) {
              number += 1;
              domString += `
                <div class="form-group">
                  <input class="form-check-input" type="checkbox" value="" id="${ride.id}">
                  <label class="form-check-label checkmark" for="${ride.id}">
                    ${ride.name}
                  </label>
                </div>
              `;
            }
          });
          equip.forEach((oneEquip) => {
            if (oneEquip.isOperational === false) {
              number += 1;
              domString += `
                <div class="form-group">
                  <input class="form-check-input" type="checkbox" value="" id="${oneEquip.id}">
                  <label class="form-check-label checkmark" for="${oneEquip.id}">
                    ${oneEquip.name}
                  </label>
                </div>
              `;
            }
          });

          domString += `
                <div class="d-flex justify-content-end">
                  <button type="submit" class="btn btn-success" id="fixIssues">Fix</button>
                </div>
              </form>
            </div>
          </div>
        `;
          utils.printToDom('#notifications', domString);
          if (number > 0) {
            $('.badge').html(number);
          } else {
            $('.badge').html('');
            $('.notification-dropdown').html('<h4>No Issues!<i class="fas fa-check"></i></h4>');
          }
        });
    })
    .catch((err) => console.error('Getting ride and equipment data did not work -> ', err));
};

export default { buildNotification, updateNotification };
