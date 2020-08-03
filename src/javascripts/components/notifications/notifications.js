import utils from '../../helpers/utils';
import './notifications.scss';
import rideData from '../../helpers/data/rideData';
import equipData from '../../helpers/data/equipData';

const updateStatus = (e) => {
  e.preventDefault();
  // const formData = e.currentTarget.form;
  console.warn(e.target.closest('.dropdown').dataset.currentnumber);

  // rideData.getAllRides()
  //   .then((rides) => {
  //     equipData.getAllEquipment()
  //       .then((equip) => {
  //         for (let i = 0; i < formData.length; i += 1) {
  //           if ($(formData[i]).is(':checked')) {
  //             rides.forEach((ride) => {
  //               if (formData[i].id === ride.id) {
  //                 rideData.patchRide(ride.id, { isOperational: true });
  //               }
  //             });
  //             equip.forEach((oneEquip) => {
  //               if (formData[i].id === oneEquip.id) {
  //                 equipData.patchEquipment(oneEquip.id, { isOperational: true });
  //               }
  //             });
  //           }
  //         }
  //       });
  //     // eslint-disable-next-line no-use-before-define
  //     buildNotification();
  //   })
  //   .catch((err) => console.error(err));
};

const buildNotification = (number) => {
  let domString = '';
  rideData.getAllRides()
    .then((rides) => {
      equipData.getAllEquipment()
        .then((equip) => {
          domString += `
          <div class="dropdown" data-currentNumber=${number}>
            <button type="button" class="btn btn-warning notifications dropdown-toggle" id="dropdownIssueButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Issues <span class="badge badge-light">${number}</span>
              <span class="sr-only">unread messages</span>
            </button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownIssueButton">
              <h5><i class="fas fa-toolbox"></i> Need fixin'</h5>
              <form>`;
          rides.forEach((ride) => {
            if (ride.isOperational === false) {
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

export default { getIssues, updateStatus };
