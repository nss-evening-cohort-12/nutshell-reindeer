import staffData from '../../helpers/data/staffData';
import utils from '../../helpers/utils';

const editStaff = (e) => {
  e.preventDefault();
  let isChecked = 'false';
  const collectionId = e.target.closest('.editForm').id;
  if ($('#edit-staff-kidnapped').is(':checked')) {
    isChecked = 'true';
  } else {
    isChecked = 'false';
  }
  const tempEditedStaff = {
    staffName: $('#edit-staff-name').val(),
    staffTitle: $('#edit-staff-title').val(),
    staffImgUrl: $('#edit-staff-imgUrl').val(),
    kidnap: isChecked,
  };
  // pass those to an update equipment data function
  staffData.updateStaff(collectionId, tempEditedStaff)
    .then(() => {
      $(`#${utils.getActive()}`).click();
      $('#addButtonDiv').removeClass('d-none');
    });
};

export default { editStaff };
