import equipData from '../../helpers/data/equipData';
import utils from '../../helpers/utils';

const editEquipment = (e) => {
  e.preventDefault();
  let isChecked = false;
  const collectionId = e.target.closest('.editForm').id;
  if ($('#edit-equip-operational').is(':checked')) {
    isChecked = true;
  } else {
    isChecked = false;
  }
  const tempEditedEquip = {
    equipName: $('#edit-equip-name').val(),
    equipType: $('#edit-equip-type').val(),
    equipLocation: $('#edit-equip-location').val(),
    equipImgUrl: $('#edit-equip-imgUrl').val(),
    equipOperational: isChecked,
  };
  // pass those to an update equipment data function
  equipData.updateEquipment(collectionId, tempEditedEquip)
    .then(() => {
      $(`#${utils.getActive()}`).click();
      $('#addButtonDiv').removeClass('d-none');
    });
};

export default { editEquipment };
