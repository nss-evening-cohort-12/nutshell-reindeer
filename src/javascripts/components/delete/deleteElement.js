import utils from '../../helpers/utils';

import staffData from '../../helpers/data/staffData';
import dinoData from '../../helpers/data/dinoData';
import equipData from '../../helpers/data/equipData';
import rideData from '../../helpers/data/rideData';
import vendorData from '../../helpers/data/vendorData';

const removeExecute = (e) => {
  const collectionId = e.target.closest('.card').id;
  const collectionName = utils.getActive();
  switch (collectionName) {
    case 'staff':
      staffData.deleteStaffById(collectionId)
        .then(() => {
          $(`#${utils.getActive()}`).click();
        })
        .catch((err) => console.error('could not delete staff member ', err));
      break;
    case 'dinosaurs':
      dinoData.deleteDinosById(collectionId)
        .then(() => {
          $(`#${utils.getActive()}`).click();
        })
        .catch((err) => console.error('could not delete dino ', err));
      break;
    case 'equipment':
      equipData.deleteEquipById(collectionId)
        .then(() => {
          $(`#${utils.getActive()}`).click();
        })
        .catch((err) => console.error('could not delete this equipment Card ', err));
      break;
    case 'rides':
    // console.warn('do delete staff member by id');
      rideData.deleteRideById(collectionId)
        .then(() => {
          $(`#${utils.getActive()}`).click();
        })
        .catch((err) => console.error('could not delete this Ride Card ', err));
      break;
    case 'vendors':
      vendorData.deleteVendorById(collectionId)
        .then(() => {
          $(`#${utils.getActive()}`).click();
        })
        .catch((err) => console.error('could not delete vendor ', err));
      break;
    default:
      // console.warn('this is just defulte');
  }
};

export default { removeExecute };
