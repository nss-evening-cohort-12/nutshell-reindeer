import staffData from '../../helpers/data/staffData';
import utils from '../../helpers/utils';
import staffList from './staffList';

const cancelEdit = () => {
  staffList.displayStaff();
  $('#addForm').addClass('hide');
};

const editStaffDomStringBuilder = (collectionId, staffObj) => {
  const domString = `            
        <form class="edit-staff m-5 editStaffForm">
        <h2>Edit Staff</h2>
        <div class="form-group">
            <label for="editStaffName">Name:</label>
            <input type="text" class="form-control" id="editStaffName" value="${staffObj.name}">
        </div>
        <div class="form-group">
            <label for="editStaffTitle">Title:</label>
            <input type="text" class="form-control" name="editStaffTitle" value="${staffObj.title}">
        </div>
        <div class="form-group">
            <label for="editStaffImgUrl">Image URL</label>
            <input type="text" class="form-control" name="editStaffImgUrl" value="${staffObj.imgUrl}">
        </div>
        <div class="form-group">
            <label for="editStaffActive">Currently Active?</label>
            <input type="checkbox" class="form-control" name="isActive">
        </div>
        <input type="hidden" class="form-control" name="collectionId" value="${collectionId}">
        <button type="submit" class="btn btn-primary" name="submitEdit">Update</button>
        <button class="btn btn-warning backButton" id="staff-editor-cancel">Cancel</button>
        </form>
    `;
  return domString;
};

const editStaff = (e) => {
  e.preventDefault();
  const collectionId = e.target.elements.collectionId.value;
  const tempEditedStaff = {
    name: e.target.elements.editStaffName.value,
    title: e.target.elements.editStaffTitle.value,
    imgUrl: e.target.elements.editStaffImgUrl.value,
    isActive: e.target.elements.isActive.checked,
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

      utils.printToDom('#addForm', domString);
      $('#addForm').removeClass('hide');
      $('#addButtonDiv').removeClass('d-none');
    })
    .catch((err) => console.warn(err));
};

export default { editStaff, staffEditForm, cancelEdit };
