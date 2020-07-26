import equipData from '../../helpers/data/equipData';
import utils from '../../helpers/utils';
import equipList from './equipList';

const assignEquipment = (e) => {
  const staffId = e.target.dataset.staffid;
  const equipId = e.target.dataset.equipid;
  equipData.getEquipById(equipId)
    .then((response) => {
      const equipObj = response.data;
      equipObj.assignedTo = staffId;
      equipData.updateEquipment(equipId, equipObj);
    })
    .catch((err) => console.error(err));
};

const editEquipDomStringBuilder = (collectionId, equipObj) => {
  const domString = `            
        <form class="edit-equip m-5 editEquipForm">
        <h2>Edit Equipment</h2>
        <div class="form-group">
            <label for="edit-equip-name">Name:</label>
            <input type="text" class="form-control" name="name" placeholder="Name" value="${equipObj.name}">
        </div>
        <div class="form-group">
            <label for="edit-equip-type">Type:</label>
            <input type="text" class="form-control" name="type" placeholder="Type" value="${equipObj.type}">
        </div>
        <div class="form-group">
            <label for="edit-equip-location">Location:</label>
            <input type="text" class="form-control" name="location" placeholder="Location" value="${equipObj.location}">
        </div>
        <div class="form-group">
            <label for="edit-equip-imgUrl">Image URL</label>
            <input type="text" class="form-control" name="imgUrl" placeholder="Image URL" value="${equipObj.imgUrl}">
        </div>
        <div class="form-group">
          <div class="form-check">
            <label class="form-check-label" for="isOperational">Is Operational</label>              
            <input class="form-check-input" name="isOperational" type="checkbox"${(equipObj.isOperational) ? 'checked' : ''}>
          </div>
        </div>
        <input type="hidden" class="form-control" name="collectionId" value="${collectionId}">

        <button type="submit" class="btn btn-primary" id="submitEdit">Update</button>
        <button class="btn btn-warning backButton" id="equip-editor-cancel">Cancel</button>
        </form>
    `;
  return domString;
};

const editEquipment = (e) => {
  e.preventDefault();
  const collectionId = e.target.elements.collectionId.value;
  const tempEditedEquip = {
    name: e.target.elements.name.value,
    type: e.target.elements.type.value,
    location: e.target.elements.location.value,
    imgUrl: e.target.elements.imgUrl.value,
    isOperational: e.target.elements.isOperational.checked,
  };
  // pass those to an update equipment data function
  equipData.updateEquipment(collectionId, tempEditedEquip)
    .then(() => {
      equipList.displayEquipCollection();
    });
};

const equipmentEditForm = (e) => {
  const collectionId = e.target.closest('.card').id;
  equipData.getEquipById(collectionId)
    .then((response) => {
      const equip = response.data;

      const domString = editEquipDomStringBuilder(collectionId, equip);

      utils.printToDom('#addForm', domString);
      $('#addForm').removeClass('hide');
      $('#addButtonDiv').removeClass('d-none');
    })
    .catch((err) => console.warn(err));
};

export default {
  editEquipment, editEquipDomStringBuilder, equipmentEditForm, assignEquipment,
};
