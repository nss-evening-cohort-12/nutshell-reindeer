import dinoList from '../components/dinos/dinoList';
import equipList from '../components/equipment/equipList';
import rideList from '../components/rides/rideList';
import editButton from '../components/edit/editButton';
import vendorCards from '../components/vendors/vendorCards';
import staffList from '../components/staff/staffList';
import checkUser from './data/checkUser';

const showAddForm = () => {
  $('#addForm').removeClass('hide');
};

const navBarEventListeners = () => {
  $('.navbar-nav a').click((event) => {
    $('.navbar-nav .active').removeClass('active');
    $(event.target).addClass('active');
  });
  $('#dinosaurs').click(() => {
    dinoList.displayDinos();
  });
  $('#staff').click(() => {
    staffList.displayStaff();
  });
  $('#equipment').click(() => {
    equipList.displayEquipCollection();
  });
  $('#rides').click(() => {
    rideList.displayRides();
  });
  $('#vendors').click(() => {
    vendorCards.displayVendors();
  });
};

const clickEvents = () => {
  navBarEventListeners();
  if (checkUser.checkUser()) {
    $('body').on('click', '.editCard', editButton.editButtonEvent);
    $('body').on('click', '#addButton', showAddForm);
    $('body').on('submit', '#dinoAddForm', dinoList.addDino);
    $('body').on('submit', '#equipAddForm', equipList.addEquipment);
    $('body').on('submit', '#addRideForm', rideList.addRide);
    $('body').on('submit', '#vendorAddForm', vendorCards.addVendor);
    $('body').on('submit', '#staffAddForm', staffList.addStaff);
  }
};

export default { clickEvents };
