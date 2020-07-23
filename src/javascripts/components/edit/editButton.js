import utils from '../../helpers/utils';
// eslint-disable-next-line import/no-cycle
import editForms from './editForms';

// eslint-disable-next-line consistent-return
const whichEditForm = (collectionName, collectionId) => {
  switch (collectionName) {
    case 'dinosaurs':
      editForms.dinoEditForm(collectionId);
      break;
    case 'equipment':
      editForms.equipmentEditForm(collectionId);
      break;
    case 'rides':
      editForms.rideEditForm(collectionId);
      break;
    case 'vendors':
      editForms.vendorEditForm(collectionId);
      break;
    case 'staff':
      editForms.staffEditForm(collectionId);
      break;
    default:
      return 'no form to add';
  }
};

const editButtonEvent = (e) => {
  e.preventDefault();
  // console.warn('excute remove event');
  $('#addButtonDiv').addClass('d-none');
  const collectionId = e.target.closest('.card').id;
  const collectionName = utils.getActive();
  whichEditForm(collectionName, collectionId);
};

export default { editButtonEvent };
