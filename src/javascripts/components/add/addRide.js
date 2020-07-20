import rideData from '../../helpers/data/rideData';
import utils from '../../helpers/utils';

const addRide = () => {
  const tempRideObj = {
    rideName: $('#addRideName').val(),
    rideType: $('#addRideType').val(),
    rideImgUrl: $('#addRideImgUrl').val(),
    rideLocation: $('#addRideLocation').val(),
    rideOperational: true,
  };
  rideData.addRide(tempRideObj).then(() => {
    $(`#${utils.getActive()}`).click();
    $('#addButton').click();
  });
};

export default { addRide };
