import staffData from '../../helpers/data/staffData';
import utils from '../../helpers/utils';
import staffList from './staffList';

const editStaffDomStringBuilder = (collectionId, staffObj) => {
  const domString = `            
        <form class="edit-staff m-5 editStaffForm">
        <h2>Edit Equipment</h2>
        <div class="form-group">
            <label for="editStaffName">Name:</label>
            <input type="text" class="form-control" id="editStaffName" value="${staffObj.staffName}">
        </div>
        <div class="form-group">
            <label for="editStaffTitle">Title:</label>
            <input type="text" class="form-control" name="editStaffTitle" value="${staffObj.staffTitle}">
        </div>
        <div class="form-group">
            <label for="editStaffImgUrl">Image URL</label>
            <input type="text" class="form-control" name="editStaffImgUrl" value="${staffObj.staffImgUrl}">
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
    staffName: e.target.elements.editStaffName.value,
    staffTitle: e.target.elements.editStaffTitle.value,
    staffImgUrl: e.target.elements.editStaffImgUrl.value,
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

export default { editStaff, staffEditForm };
