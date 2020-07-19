import dinoData from '../../helpers/data/dinoData';
import utils from '../../helpers/utils';

const addDino = () => {
  const tempDinoOjb = {
    dinoName: $('#addDinoName').val(),
    dinoType: $('#addDinoType').val(),
    dinoImgUrl: $('#addDinoImgUrl').val(),
    dinoSize: $('#addDinoSize').val(),
  };
  dinoData.addDino(tempDinoOjb).then(() => {
    $(`#${utils.getActive()}`).click();
    $('#addButton').click();
  });
};

export default { addDino };
