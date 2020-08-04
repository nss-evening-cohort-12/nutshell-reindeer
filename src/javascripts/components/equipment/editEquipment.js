import equipData from '../../helpers/data/equipData';
import utils from '../../helpers/utils';
import equipList from './equipList';
import notifications from '../notifications/notifications';

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
  
  <div class="modal" id="editEquipModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Edit Equipment Item</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

        <form class="edit-equip m-5 editEquipForm">
        <div class="form-group">
            <label for="editEquipName">Item Name:</label>
            <input type="text" class="form-control" name="editEquipName" placeholder="Name" value="${equipObj.name}">
        </div>
        <div class="form-group">
            <label for="editEquipType">Item Type</label>
            <select name="editEquipType" class="form-control">
              <option value="Office"${equipObj.type === 'Office' ? ' selected' : ''}>Office</option>
              <option value="Safety"${equipObj.type === 'Safety' ? ' selected' : ''}>Safety</option>
              <option value="Tool"${equipObj.type === 'Tool' ? ' selected' : ''}>Tool</option>
              <option value="Vehicle"${equipObj.type === 'Vehicle' ? ' selected' : ''}>Vehicle</option>
              <option value="Misc"${equipObj.type === 'Misc' ? ' selected' : ''}>(Other)</option>
            </select>
          </div>
          <div class="form-group">
          <label for="editEquipLocation">Item Location</label>
          <select name="editEquipLocation" class="form-control">
            <option value="Office"${equipObj.location === 'Office' ? ' selected' : ''}>Office</option>
            <option value="Parking Lot"${equipObj.location === 'Parking Lot' ? ' selected' : ''}>Parking Lot</option>
            <option value="Warehouse"${equipObj.location === 'Warehouse' ? ' selected' : ''}>Warehouse</option>
            <option value="With Employee"${equipObj.location === 'With Employee' ? ' selected' : ''}>With Employee</option>
            <option value="Unknown"${equipObj.location === 'Unknown' ? ' selected' : ''}>Unknown</option>
          </select>
        </div>    
        <div class="form-group">
          <div class="form-check">
          <input class="" name="editEquipOperational" id="editEquipOperational" type="checkbox"${(equipObj.isOperational) ? 'checked' : ''}>
            <label class="" for="editEquipOperational"> Operational</label>              
          </div>
        </div>
        <input type="hidden" class="form-control" name="collectionId" value="${collectionId}">
        <button type="submit" class="btn btn-primary" id="submitEdit">Update</button>
        </form>

        </div>

        </div>
      </div>
    </div>
      
    `;
  return domString;
};

const editEquipment = (e) => {
  e.preventDefault();
  $('#editEquipModal').modal('hide');
  const collectionId = e.target.elements.collectionId.value;
  const tempEditedEquip = {
    name: e.target.elements.editEquipName.value,
    type: e.target.elements.editEquipType.value,
    location: e.target.elements.editEquipLocation.value,
    isOperational: $('#editEquipOperational').is(':checked'),
  };
  // pass those to an update equipment data function
  equipData.updateEquipment(collectionId, tempEditedEquip)
    .then(() => {
      equipList.displayEquipCollection();
      notifications.buildNotification();
    })
    .catch((err) => console.error(err));
};

const equipmentEditForm = (e) => {
  const collectionId = e.target.closest('.card').id;
  equipData.getEquipById(collectionId)
    .then((response) => {
      const equip = response.data;

      const domString = editEquipDomStringBuilder(collectionId, equip);

      utils.printToDom('#editForm', domString);
      $('#editEquipModal').modal();
      $('#addButtonDiv').removeClass('d-none');
    })
    .catch((err) => console.error(err));
};

export default {
  editEquipment, editEquipDomStringBuilder, equipmentEditForm, assignEquipment,
};
