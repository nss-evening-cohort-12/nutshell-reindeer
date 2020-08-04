import staffData from '../../helpers/data/staffData';
import utils from '../../helpers/utils';
import staffList from './staffList';

const cancelEdit = () => {
  staffList.displayStaff();
  $('#addForm').addClass('hide');
};

const changeAvatar = () => {
  const newUrl = staffList.avatarGenerator();
  const domString = `<img src="${newUrl}" class="w-100" id="new-avatar-chooser" data-url="${newUrl}">`;
  utils.printToDom('#chosen-new-avatar', domString);
};

const editStaffDomStringBuilder = (collectionId, staffObj) => {
  const domString = `    
  <div class="modal" id="editStaffModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Update Staff Member</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

        <form class="edit-staff m-5 editStaffForm">
        <div class="form-group">
            <label for="editStaffName">Name</label>
            <input type="text" class="form-control" id="editStaffName" value="${staffObj.name}">
        </div>

        <div class="form-group">
          <label for="editStaffTitle">Position</label>
          <select name="editStaffTitle" id="editStaffTitle" class="form-control">
            <option value="Dino Handler" ${staffObj.title === 'Dino Handler' ? ' selected' : ''}>Dino Handler</option>
            <option value="Ride Attendant" ${staffObj.title === 'Ride Attendant' ? ' selected' : ''}>Ride Attendant</option>
            <option value="Vendor Operator" ${staffObj.title === 'Vendor Operator' ? ' selected' : ''}>Vendor Operator</option>
            <option value="" ${staffObj.title === '' ? ' selected' : ''}>(none)</option>
          </select>
        </div>

        <div class="form-group">
            <label>Profile Pic</label>
            <div class="text-center text-secondary">Click to select another image</div>
            <div id="chosen-new-avatar">
              <img src="${staffObj.imgUrl}" class="w-100" id="new-avatar-chooser" data-url="${staffObj.imgUrl}">
            </div>
          </div>

        <div class="form-group">
            <label for="editStaffActive">Currently Active?</label>
            <input type="checkbox" name="isActive" checked>
        </div>
        <input type="hidden" class="form-control" name="collectionId" value="${collectionId}">
        <input type="hidden" class="form-control" name="assignedTo" value="${staffObj.assignedTo}">
        <input type="hidden" class="form-control" name="assignmentCategory" value="${staffObj.assignmentCategory}">
        <button type="submit" class="btn btn-primary" name="submitEdit">Update</button>
        </form>

        </div>
    </div>
  </div>
</div>
    `;
  $('body').on('click', '#new-avatar-chooser', changeAvatar);
  return domString;
};

const editStaff = (e) => {
  e.preventDefault();
  $('#editStaffModal').modal('hide');
  const collectionId = e.target.elements.collectionId.value;
  const tempEditedStaff = {
    name: e.target.elements.editStaffName.value,
    title: e.target.elements.editStaffTitle.value,
    imgUrl: $('#new-avatar-chooser')[0].dataset.url,
    isActive: e.target.elements.isActive.checked,
    assignedTo: e.target.elements.assignedTo.value,
    assignmentCategory: e.target.elements.assignmentCategory.value,
  };
  // pass those to an update equipment data function
  staffData.updateStaff(collectionId, tempEditedStaff)
    .then(() => {
      staffList.displayStaff();
    });
};

const staffEditForm = (e) => {
  const collectionId = e.target.closest('.card').id;
  staffData.getStaffById(collectionId)
    .then((response) => {
      const staff = response.data;
      const domString = editStaffDomStringBuilder(collectionId, staff);

      utils.printToDom('#editForm', domString);
      $('#editStaffModal').modal();
      // $('#addForm').removeClass('hide');
      $('#addButtonDiv').removeClass('d-none');
    })
    .catch((err) => console.error(err));
};

export default { editStaff, staffEditForm, cancelEdit };
