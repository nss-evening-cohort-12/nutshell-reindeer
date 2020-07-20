import utils from '../../helpers/utils';

import addForms from '../add/addForms';
// eslint-disable-next-line import/no-cycle
import editForms from './editForms';

// eslint-disable-next-line consistent-return
const whichEditForm = (collectionName, collectionId) => {
  switch (collectionName) {
    case 'equipment':
      editForms.equipmentEditForm(collectionId);
      break;
    case 'rides':
      editForms.rideEditForm(collectionId);
      break;
    default:
      return addForms.junkTestForm();
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
