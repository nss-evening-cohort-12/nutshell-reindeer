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
      equipData.updateEquipment(equipId, equipObj)
        .then(() => {
          equipList.displayEquipCollection();
        })
        .catch((err) => console.error(err));
    });
};

const editEquipDomStringBuilder = (collectionId, equipObj) => {
  const domString = `            
        <form class="edit-equip m-5 editEquipForm">
        <h2>Edit Equipment</h2>
        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" class="form-control" name="name" placeholder="Name" value="${equipObj.name}">
        </div>
        <div class="form-group">
        <label for="type">Type:</label>
        <select id="cars" class="form-control" name="type">
          <option value="Office"${equipObj.type === 'Office' ? ' selected' : ''}>Office</option>
          <option value="Tool"${equipObj.type === 'Tool' ? ' selected' : ''}>Tool</option>
          <option value="Safety"${equipObj.type === 'Safety' ? ' selected' : ''}>Safety</option>
          <option value="Vehicle"${equipObj.type === 'Vehicle' ? ' selected' : ''}>Vehicle</option>
        </select>
        </div>
        <div class="form-group">
            <label for="location">Location:</label>
            <input type="text" class="form-control" name="location" placeholder="Location" value="${equipObj.location}">
        </div>
        <div class="form-group">
            <label for="imgUrl">Image URL</label>
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
    })
    .catch((err) => console.error(err));
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
