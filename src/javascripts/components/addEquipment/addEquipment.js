import equipData from '../../helpers/data/equipData';
import utils from '../../helpers/utils';

const addEquipment = () => {
  const tempEquipOjb = {
    equipName: $('#addEquipName').val(),
    equipType: $('#addEquipType').val(),
    equipImgUrl: $('#addEquipImgUrl').val(),
    equipLocation: $('#addEquipLocation').val(),
    equipOperational: true,
  };
  equipData.addEquipment(tempEquipOjb).then(() => {
    $(`#${utils.getActive()}`).click();
    $('#addButton').click();
  });
};

export default { addEquipment };
