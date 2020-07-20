import rideData from '../../helpers/data/rideData';
import utils from '../../helpers/utils';

const editRide = (e) => {
  e.preventDefault();
  let isChecked = false;
  const collectionId = e.target.closest('.editForm').id;
  if ($('#edit-ride-operational').is(':checked')) {
    isChecked = true;
  } else {
    isChecked = false;
  }
  const tempEditedRide = {
    rideName: $('#edit-ride-name').val(),
    rideType: $('#edit-ride-type').val(),
    rideLocation: $('#edit-ride-location').val(),
    rideImgUrl: $('#edit-ride-imgUrl').val(),
    rideOperational: isChecked,
  };
  // pass those to an update equipment data function
  rideData.updateRide(collectionId, tempEditedRide)
    .then(() => {
      $(`#${utils.getActive()}`).click();
      $('#addButtonDiv').removeClass('d-none');
    });
};

export default { editRide };
