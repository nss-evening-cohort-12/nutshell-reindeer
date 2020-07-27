import rideData from '../../helpers/data/rideData';
import utils from '../../helpers/utils';
import rideList from './rideList';

const editRideDomStringBuilder = (collectionId, rideObj) => {
  const domString = `            
        <form class="edit-equip m-5 editRideForm">
        <h2>Edit Equipment</h2>
        <div class="form-group">
            <label for="editRideName">Name:</label>
            <input type="text" class="form-control" id="editRideName" placeholder="Cordyceps" value="${rideObj.name}">
        </div>
        <div class="form-group">
            <label for="editRideType">Type:</label>
            <input type="text" class="form-control" name="editRideType" placeholder="M" value="${rideObj.rideType}">
        </div>
        <div class="form-group">
            <label for="edit-ride-location">Location:</label>
            <input type="text" class="form-control" name="editRideLocation" placeholder="Farm" value="${rideObj.rideLocation}">
        </div>
        <div class="form-group">
            <label for="edit-ride-imgUrl">Image URL</label>
            <input type="text" class="form-control" name="editRideImgUrl" placeholder="Image URL" value="${rideObj.rideImgUrl}">
        </div>
        <div class="form-group">
          <div class="form-check">
            <label class="form-check-label" for="editRideOperational">Is Operational</label> 
            <input class="form-check-input" id="editRideOperational" type="checkbox"${(rideObj.rideOperational) ? 'checked' : ''}>
          </div>
        </div>
        <input type="hidden" class="form-control" name="collectionId" value="${collectionId}">
        <button type="submit" class="btn btn-primary" name="submitEdit">Update</button>
        <button class="btn btn-warning" id="ride-editor-cancel">Cancel</button>
        </form>
    `;
  return domString;
};

const editRide = (e) => {
  e.preventDefault();
  const collectionId = e.target.elements.collectionId.value;
  const isChecked = $('#editRideOperational').is(':checked');
  console.error('checkbox returned ', isChecked);
  const tempEditedRide = {
    name: e.target.elements.editRideName.value,
    rideType: e.target.elements.editRideType.value,
    rideLocation: e.target.elements.editRideLocation.value,
    rideImgUrl: e.target.elements.editRideImgUrl.value,
    rideOperational: $('#editRideOperational').is(':checked'),
  };
  // pass those to an update equipment data function
  rideData.updateRide(collectionId, tempEditedRide)
    .then(() => {
      rideList.displayRides();
    });
};

const rideEditForm = (e) => {
  const collectionId = e.target.closest('.card').id;
  rideData.getRideById(collectionId)
    .then((response) => {
      const ride = response.data;
      const domString = editRideDomStringBuilder(collectionId, ride);

      utils.printToDom('#addForm', domString);
      $('#addForm').removeClass('hide');
      $('#addButtonDiv').removeClass('d-none');
    })
    .catch((err) => console.warn(err));
};

export default { editRide, rideEditForm };
