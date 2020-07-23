import utils from './utils';
import dinoList from '../components/dinos/dinoList';
import rideList from '../components/rides/rideList';
import editButton from '../components/edit/editButton';
import vendorCards from '../components/vendors/vendorCards';

const showAddForm = () => {
  $('#addForm').removeClass('hide');
};

const clickEvents = () => {
  $('body').on('click', '.editCard', editButton.editButtonEvent);
  $('body').on('click', '.backButton', () => {
    utils.printToDom('#addForm', '');
    $('#addForm').addClass('hide');
    $('#addButtonDiv').removeClass('d-none');
  });
  $('body').on('click', '#addButton', showAddForm);
  $('body').on('submit', '#dinoAddForm', dinoList.addDino);
  $('body').on('submit', '#addRideForm', rideList.addRide);
  $('body').on('submit', '#vendorAddForm', vendorCards.addVendor);
};

export default { clickEvents };
