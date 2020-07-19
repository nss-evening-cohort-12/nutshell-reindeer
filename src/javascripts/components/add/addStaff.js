import staffData from '../../helpers/data/staffData';

import utils from '../../helpers/utils';

const addStaff = () => {
  const tempStaffOjb = {
    staffName: $('#addStaffName').val(),
    staffTitle: $('#addStaffTitle').val(),
    staffImgUrl: $('#addStaffImgUrl').val(),
    kidnap: 'false',
  };
  staffData.addStaff(tempStaffOjb).then(() => {
    $(`#${utils.getActive()}`).click();
    $('#addButton').click();
  });
};

export default { addStaff };
