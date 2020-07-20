import equipData from '../../helpers/data/equipData';
import vendorData from '../../helpers/data/vendorData';
// eslint-disable-next-line import/no-cycle
import edit from './editEquipment';
import utils from '../../helpers/utils';
import editFormBuilder from './editFormDomStringBuilder';
import editVendor from './editVendor';

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
      $('#submitEdit').click(edit.editEquipment);
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

export default { equipmentEditForm, vendorEditForm };
