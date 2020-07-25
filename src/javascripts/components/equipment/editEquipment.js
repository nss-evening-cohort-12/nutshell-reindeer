import equipData from '../../helpers/data/equipData';
import utils from '../../helpers/utils';
import equipList from './equipList';

const editEquipDomStringBuilder = (collectionId, equipObj) => {
  const domString = `            
        <form class="edit-equip m-5 editEquipForm" >
        <h2>Edit Equipment</h2>
        <div class="form-group">
            <label for="edit-equip-name">Name:</label>
            <input type="text" class="form-control" name="editEquipName" placeholder="Name" value=${equipObj.equipName}>
        </div>
        <div class="form-group">
            <label for="edit-equip-type">Type:</label>
            <input type="text" class="form-control" name="editEquipType" placeholder="Type" value=${equipObj.equipType}>
        </div>
        <div class="form-group">
            <label for="edit-equip-location">Location:</label>
            <input type="text" class="form-control" name="editEquipLocation" placeholder="Location" value=${equipObj.equipLocation}>
        </div>
        <div class="form-group">
            <label for="edit-equip-imgUrl">Image URL</label>
            <input type="text" class="form-control" name="editEquipImgUrl" placeholder="Image URL" value=${equipObj.equipImgUrl}>
        </div>
        <div class="form-group">
          <div class="form-check">
            <label class="form-check-label" for="editEquipOperational">Is Operational</label>              
            <input class="form-check-input" name="editEquipOperational" type="checkbox"${(equipObj.equipOperational) ? 'checked' : ''}>
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
    equipName: e.target.elements.editEquipName.value,
    equipType: e.target.elements.editEquipName.value,
    equipLocation: e.target.elements.editEquipName.value,
    equipImgUrl: e.target.elements.editEquipName.value,
    equipOperational: $('#edit-equip-operational').is(':checked'),
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

export default { editEquipment, editEquipDomStringBuilder, equipmentEditForm };
