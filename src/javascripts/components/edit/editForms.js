import equipData from '../../helpers/data/equipData';
import vendorData from '../../helpers/data/vendorData';
import dinoData from '../../helpers/data/dinoData';
// eslint-disable-next-line import/no-cycle
import editEquipment from './editEquipment';
import editRide from './editRide';
import utils from '../../helpers/utils';
import editFormBuilder from './editFormDomStringBuilder';
import rideData from '../../helpers/data/rideData';
import editVendor from './editVendor';
import editDino from './editDino';

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

const vendorEditForm = (collectionId) => {
  vendorData.getVendorById(collectionId)
    .then((response) => {
      const vendor = response.data;

      const domString = editFormBuilder.editVendorDomStringBuilder(collectionId, vendor);

      utils.printToDom('#addForm', domString);
      const addformElement = $('#addForm');
      if (addformElement.hasClass('hide')) {
        addformElement.removeClass('hide');
      }
      $('#submitEdit').click(editVendor.editVendor);
      $('#addButtonDiv').removeClass('d-none');
    })
    .catch((err) => console.warn(err));
};

const dinoEditForm = (collectionId) => {
  dinoData.getDinoById(collectionId)
    .then((response) => {
      const dino = response.data;
      const domString = editFormBuilder.editDinoDomStringBuilder(collectionId, dino);

      utils.printToDom('#addForm', domString);
      const addformElement = $('#addForm');
      if (addformElement.hasClass('hide')) {
        addformElement.removeClass('hide');
      }
      $('#submitEdit').click(editDino.editDino);
      $('#addButtonDiv').removeClass('d-none');
    })
    .catch((err) => console.warn(err));
};

export default {
  equipmentEditForm,
  vendorEditForm,
  rideEditForm,
  dinoEditForm,
};
