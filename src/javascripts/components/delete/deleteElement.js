// import auth from '../auth/auth';

// import dinoList from '../listView/dinoList';
// import addButton from '../add/addButton';
// import staffList from '../listView/staffList';
// import equipList from '../listView/equipList';

import utils from '../../helpers/utils';

import staffData from '../../helpers/data/staffData';
import dinoData from '../../helpers/data/dinoData';
import equipData from '../../helpers/data/equipData';

const removeExecute = (e) => {
  // console.warn('excute remove event');
  const collectionId = e.target.closest('.card').id;
  // console.warn(collectionId);
  const collectionName = utils.getActive();
  // console.warn(collectionName);
  switch (collectionName) {
    case 'staff':
      // console.warn('do delete staff member by id');
      staffData.deleteStaffById(collectionId)
        .then(() => {
          $(`#${utils.getActive()}`).click();
        })
        .catch((err) => console.error('could not delete board ', err));
      break;
    case 'dinosaurs':
      dinoData.deleteDinosById(collectionId)
        .then(() => {
          $(`#${utils.getActive()}`).click();
        })
        .catch((err) => console.error('could not delete board ', err));
      break;
    case 'equipment':
      // console.warn('do delete staff member by id');
      equipData.deleteEquipById(collectionId)
        .then(() => {
          $(`#${utils.getActive()}`).click();
        })
        .catch((err) => console.error('could not delete this equipment Card ', err));
      break;
    default:
      // console.warn('this is just defulte');
  }
};

export default { removeExecute };
