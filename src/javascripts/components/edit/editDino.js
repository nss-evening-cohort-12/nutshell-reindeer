import dinoData from '../../helpers/data/dinoData';
import utils from '../../helpers/utils';

const editDino = (e) => {
  e.preventDefault();
  const collectionId = e.target.closest('.editForm').id;

  const tempEditedDino = {
    dinoName: $('#edit-dino-name').val(),
    dinoType: $('#edit-dino-type').val(),
    dinoImgUrl: $('#edit-dino-imgUrl').val(),
    dinoSize: $('#edit-dino-size').val(),
  };
  // pass those to an update vendor data function
  dinoData.updateDino(collectionId, tempEditedDino)
    .then(() => {
      $(`#${utils.getActive()}`).click();
      $('#addButtonDiv').removeClass('d-none');
    });
};

export default { editDino };
