import equipData from '../../helpers/data/equipData';
// eslint-disable-next-line import/no-cycle
import edit from './editEquipment';
import utils from '../../helpers/utils';
import editFormBuilder from './editFormDomStringBuilder';

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

export default { equipmentEditForm };
