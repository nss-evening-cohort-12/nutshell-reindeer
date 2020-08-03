import rideData from '../../helpers/data/rideData';
import utils from '../../helpers/utils';
import rideList from './rideList';

const editRideDomStringBuilder = (collectionId, rideObj) => {
  const domString = `
  <div class="modal" id="editRideModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Edit Ride</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">            
        <form class="edit-equip m-5 editRideForm">
        <h2>Edit Equipment</h2>
        <div class="form-group">
            <label for="editRideName">Name:</label>
            <input type="text" class="form-control" id="editRideName" value="${rideObj.name}">
        </div>
        <div class="form-group">
          <label for="editRideType">Type</label>
          <select name="editRideType" class="form-control">
            <option value="Moving"${rideObj.type === 'Moving' ? ' selected' : ''}>Moving</option>
            <option value="Exhibit"${rideObj.type === 'Exhibit' ? ' selected' : ''}>Exhibit</option>
            <option value="Show"${rideObj.type === 'Show' ? ' selected' : ''}>Show</option>
            <option value="Misc"${rideObj.type === 'Misc' ? ' selected' : ''}>(Other)</option>
          </select>
        </div>
        <div class="form-group">
          <div class="form-check">
          <input class="" name="editRideOperational" id="editRideOperational" type="checkbox"${(rideObj.isOperational) ? 'checked' : ''}>
            <label class="" for="editRideOperational">Operational</label>              
          </div>
        </div>
        <input type="hidden" class="form-control" name="collectionId" value="${collectionId}">
        <button type="submit" class="btn btn-primary" name="submitEdit">Update</button>
        </form>
        </div>
      </div>
    </div>
  </div>
    `;
  return domString;
};

const editRide = (e) => {
  e.preventDefault();
  $('#editRideModal').modal('hide');
  const collectionId = e.target.elements.collectionId.value;
  const isChecked = $('#editRideOperational').is(':checked');
  console.error('checkbox returned ', isChecked);
  const tempEditedRide = {
    name: e.target.elements.editRideName.value,
    type: e.target.elements.editRideType.value,
    isOperational: $('#editRideOperational').is(':checked'),
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

      utils.printToDom('#editForm', domString);
      $('#editRideModal').modal();
      $('#addButtonDiv').removeClass('d-none');
    })
    .catch((err) => console.error(err));
};

export default { editRide, rideEditForm };
