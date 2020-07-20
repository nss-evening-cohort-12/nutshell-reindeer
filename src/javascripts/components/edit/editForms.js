import equipData from '../../helpers/data/equipData';
// eslint-disable-next-line import/no-cycle
import editEquipment from './editEquipment';
import editRide from './editRide';
import utils from '../../helpers/utils';
import editFormBuilder from './editFormDomStringBuilder';
import rideData from '../../helpers/data/rideData';

const equipmentEditForm = (collectionId) => {
  equipData.getEquipById(collectionId)
    .then((response) => {
      const equip = response.data;

      const domString = editFormBuilder.editEquipDomStringBuilder(collectionId, equip);

      utils.printToDom('#addForm', domString);
      const addformElement = $('#addForm');
      if (addformElement.hasClass('hide')) {
        addformElement.removeClass('hide');
      }
      $('#submitEdit').click(editEquipment.editEquipment);
      $('#addButtonDiv').removeClass('d-none');
    })
    .catch((err) => console.warn(err));
};

const rideEditForm = (collectionId) => {
  rideData.getRideById(collectionId)
    .then((response) => {
      const ride = response.data;

      const domString = editFormBuilder.editRideDomStringBuilder(collectionId, ride);

      utils.printToDom('#addForm', domString);
      const addformElement = $('#addForm');
      if (addformElement.hasClass('hide')) {
        addformElement.removeClass('hide');
      }
      $('#submitEdit').click(editRide.editRide);
      $('#addButtonDiv').removeClass('d-none');
    })
    .catch((err) => console.warn(err));
};

export default { equipmentEditForm, rideEditForm };
