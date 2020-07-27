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
  
  <div class="modal fade" id="editEquipModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Edit Equipment</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

        <form class="edit-equip m-5 editEquipForm" >
        <h2>Edit Equipment</h2>
        <div class="form-group">
            <label for="edit-equip-name">Name:</label>
            <input type="text" class="form-control" name="editEquipName" placeholder="Name" value=${equipObj.name}>
        </div>
        <div class="form-group">
            <label for="edit-equip-type">Type:</label>
            <input type="text" class="form-control" name="editEquipType" placeholder="Type" value=${equipObj.type}>
        </div>
        <div class="form-group">
            <label for="edit-equip-location">Location:</label>
            <input type="text" class="form-control" name="editEquipLocation" placeholder="Location" value=${equipObj.location}>
        </div>
        <div class="form-group">
          <div class="form-check">
            <label class="form-check-label" for="editEquipOperational">Is Operational</label>              
            <input class="form-check-input" name="editEquipOperational" type="checkbox"${(equipObj.isOperational) ? 'checked' : ''}>
          </div>
        </div>
        <input type="hidden" class="form-control" name="collectionId" value="${collectionId}">

        <button type="submit" class="btn btn-primary" id="submitEdit">Update</button>
        
        </form>

        </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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
    type: e.target.elements.editEquipName.value,
    location: e.target.elements.editEquipName.value,
    isOperational: $('#edit-equip-operational').is(':checked'),
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

      utils.printToDom('#editForm', domString);
      $('#editEquipModal').modal();
      // $('#addForm').removeClass('hide');
      $('#addButtonDiv').removeClass('d-none');
    })
    .catch((err) => console.warn(err));
};

export default {
  editEquipment, editEquipDomStringBuilder, equipmentEditForm, assignEquipment,
};
