import utils from '../../helpers/utils';
import dinoData from '../../helpers/data/dinoData';
import dinoList from './dinoList';

const changeAvatar = () => {
  const dinoType = $('#edit-dino-type').val();
  const newUrl = dinoList.avatarGenerator(dinoType);
  const domString = `<img src="${newUrl}" class="w-100" id="avatar-chooser" data-url="${newUrl}">`;
  utils.printToDom('#edit-dino-avatar', domString);
};

const editDinoDomStringBuilder = (collectionId, dinoObj) => {
  const domString = `
  <div class="modal" id="editDinoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editDinoModal">Edit Dino</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">            
        <form class="edit-dino m-5 editDinoForm">
          <h2>Edit Dino</h2>
          <div class="form-group">
            <label for="editDinoName">Name:</label>
            <input type="text" class="form-control" name="editDinoName" placeholder="Dino Name" value=${dinoObj.name}>
        </div>

        <div class="form-group">
          <label for="editDinoType">Type</label>
          <select name="editDinoType" id="edit-dino-type" class="form-control start-blank">
            <option value="Diplodocus"${dinoObj.type === 'Diplodocus' ? ' selected' : ''}>Diplodocus</option>
            <option value="Pterodactyl"${dinoObj.type === 'Pterodactyl' ? ' selected' : ''}>Pterodactyl</option>
            <option value="Stegosaurus"${dinoObj.type === 'Stegosaurus' ? ' selected' : ''}>Stegosaurus</option>
            <option value="T-Rex"${dinoObj.type === 'T-Rex' ? ' selected' : ''}>T-Rex</option>
            <option value="Triceratops"${dinoObj.type === 'Triceratops' ? ' selected' : ''}>Triceratops</option>
          </select>
        </div>

        <div class="form-group">
          <label>Profile Pic</label>
          <div id="edit-dino-avatar">
          <img src="${dinoObj.imgUrl}" class="w-100" id="edit-avatar-chooser" data-url="${dinoObj.imgUrl}">
          </div>
        </div>

            <input type="hidden" class="form-control" name="collectionId" value=${collectionId}>
            <button type="submit" class="btn btn-primary" id="submitEdit">Update</button>
        </form>
        </div>
    </div>
  </div>
</div>
    `;
  return domString;
};

const editDino = (e) => {
  e.preventDefault();
  $('#editDinoModal').modal('hide');

  const collectionId = e.target.elements.collectionId.value;
  const tempEditedDino = {
    name: e.target.elements.editDinoName.value,
    type: e.target.elements.editDinoType.value,
    imgUrl: $('#avatar-chooser')[0].dataset.url,
  };
  // pass those to an update vendor data function
  dinoData.updateDino(collectionId, tempEditedDino)
    .then(() => {
      dinoList.displayDinos();
    });
};

const dinoEditForm = (e) => {
  const collectionId = e.target.closest('.card').id;
  dinoData.getDinoById(collectionId)
    .then((response) => {
      const dino = response.data;
      const domString = editDinoDomStringBuilder(collectionId, dino);
      utils.printToDom('#editForm', domString);
      $('#editDinoModal').modal();
      $('#addButtonDiv').removeClass('d-none');
    })
    .catch((err) => console.error(err));
};

export default { editDino, dinoEditForm, changeAvatar };
