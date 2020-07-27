import utils from '../../helpers/utils';
import dinoData from '../../helpers/data/dinoData';
import dinoList from './dinoList';

const editDinoDomStringBuilder = (collectionId, dinoObj) => {
  const domString = `            
        <form class="edit-vendor m-5 editDinoForm">
        <h2>Edit Vendor</h2>
        <div class="form-group">
            <label for="edit-dino-name">Name:</label>
            <input type="text" class="form-control" name="editDinoName" placeholder="Dino Name" value=${dinoObj.name}>
        </div>
        <div class="form-group">
            <label for="edit-dino-type">Type:</label>
            <input type="text" class="form-control" name="editDinoType" placeholder="T-Rex" value=${dinoObj.dinoType}>
        </div>
        <div class="form-group">
            <label for="edit-vendor-imgUrl">Image URL</label>
            <input type="text" class="form-control" name="editDinoImgUrl" placeholder="Image URL" value=${dinoObj.dinoImgUrl}>
        </div>
        <div class="form-group">
            <label for="edit-vendor-imgUrl">Dino Size</label>
            <input type="text" class="form-control" name="editDinoSize" placeholder="Medium" value=${dinoObj.dinoSize}>
        </div>
        <input type="hidden" class="form-control" name="collectionId" value=${collectionId}>
        <button type="submit" class="btn btn-primary" id="submitEdit">Update</button>
        <button class="btn btn-warning backButton" id="dino-editor-cancel">Cancel</button>
        </form>
    `;
  return domString;
};

const editDino = (e) => {
  e.preventDefault();
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

      utils.printToDom('#addForm', domString);
      $('#addForm').removeClass('hide');
      $('#addButtonDiv').removeClass('d-none');
    })
    .catch((err) => console.warn(err));
};

export default { editDino, dinoEditForm };
