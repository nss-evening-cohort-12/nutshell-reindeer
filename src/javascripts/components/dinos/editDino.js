import utils from '../../helpers/utils';
import dinoData from '../../helpers/data/dinoData';
import dinoList from './dinoList';

const editDinoDomStringBuilder = (collectionId, dinoObj) => {
  const domString = `
  <div class="modal fade" id="editDinoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
            <label for="edit-dino-name">Name:</label>
            <input type="text" class="form-control" name="editDinoName" placeholder="Dino Name" value=${dinoObj.name}>
        </div>
        <div class="form-group">
            <label for="edit-dino-type">Type:</label>
            <input type="text" class="form-control" name="editDinoType" placeholder="T-Rex" value=${dinoObj.dinoType}>
          </div>
          <div class="form-group">
            <label for="edit-dino-imgUrl">Image URL</label>
            <input type="text" class="form-control" name="editDinoImgUrl" placeholder="Image URL" value=${dinoObj.dinoImgUrl}>
          </div>
          <div class="form-group">
            <label for="edit-dino-imgUrl">Dino Size</label>
            <input type="text" class="form-control" name="editDinoSize" placeholder="Medium" value=${dinoObj.dinoSize}>
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
    dinoType: e.target.elements.editDinoType.value,
    dinoImgUrl: e.target.elements.editDinoImgUrl.value,
    dinoSize: e.target.elements.editDinoSize.value,
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
    .catch((err) => console.warn(err));
};

export default { editDino, dinoEditForm };
