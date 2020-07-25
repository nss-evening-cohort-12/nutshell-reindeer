import firebase from 'firebase/app';
import dinoList from '../components/dinos/dinoList';
import equipList from '../components/equipment/equipList';
import rideList from '../components/rides/rideList';
import vendorCards from '../components/vendors/vendorCards';
import staffList from '../components/staff/staffList';
import editDino from '../components/dinos/editDino';
import editRide from '../components/rides/editRide';

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
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('body').on('click', '#addButton', showAddForm);
      $('body').on('submit', '#dinoAddForm', dinoList.addDino);
      $('body').on('submit', '#equipAddForm', equipList.addEquipment);
      $('body').on('submit', '#addRideForm', rideList.addRide);
      $('body').on('submit', '#vendorAddForm', vendorCards.addVendor);
      $('body').on('submit', '#staffAddForm', staffList.addStaff);
      $('body').on('submit', '.editDinoForm', editDino.editDino);
      $('body').on('click', '.editDino', editDino.dinoEditForm);
      $('body').on('submit', '.editRideForm', editRide.editRide);
      $('body').on('click', '.editRide', editRide.rideEditForm);
      $('body').on('click', '.deleteRide', rideList.deleteRide);
      $('body').on('click', '#ride-editor-cancel', rideList.displayRides);
    }
  });
};

export default { clickEvents };
