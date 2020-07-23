// import auth from '../auth/auth';

import dinoList from '../dinos/dinoList';
// import addButton from '../add/addButton';

import equipList from '../equipment/equipList';
import vendorList from '../vendors/vendorCards';

// import deleteElement from '../delete/deleteElement';
import rideList from '../rides/rideList';
import staffList from '../staff/staffList';

// This removes the class of active from previous selection and
// adds the class of active on clicked collectionName button in the navbar
const navBarEventListeners = () => {
  $('.navbar-nav a').click((event) => {
    $('.navbar-nav .active').removeClass('active');
    $(event.target).addClass('active');
  });
  // Handles the addButton Click envent
  // $('#addButton').click(addButton.addButtonEvent);

  $('#dinosaurs').click(() => {
    // addButton.hideaddbutton();
    dinoList.displayDinos();
  });
  $('#staff').click(() => {
    // addButton.hideaddbutton();
    staffList.displayStaff();
  });
  $('#equipment').click(() => {
    // addButton.hideaddbutton();
    equipList.displayEquipCollection();
  });
  $('#rides').click(() => {
    // addButton.hideaddbutton();
    rideList.displayRides();
  });
  $('#vendors').click(() => {
    // addButton.hideaddbutton();
    vendorList.displayVendors();
  });
};

export default { navBarEventListeners };
