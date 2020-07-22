import auth from '../auth/auth';

import dinoList from '../listView/dinoList';
import addButton from '../add/addButton';
import staffList from '../listView/staffList';
import equipList from '../listView/equipList';
import vendorList from '../listView/vendorList';

import deleteElement from '../delete/deleteElement';
import rideList from '../listView/rideList';

const editDeleteEventListeners = () => {
  $('.deleteCard').click(deleteElement.removeExecute);
};

const showEditDelete = () => {
  $('.editCard').removeClass('hide');
  $('.deleteCard').removeClass('hide');
};

const hideEditDelete = () => {
  $('.editCard').addClass('hide');
  $('.deleteCard').addClass('hide');
};

// This removes the class of active from previous selection and
// adds the class of active on clicked collectionName button in the navbar
const navBarEventListeners = () => {
  $('.navbar-nav a').click((event) => {
    $('.navbar-nav .active').removeClass('active');
    $(event.target).addClass('active');
  });
  // Handles the addButton Click envent
  $('#addButton').click(addButton.addButtonEvent);

  $('#dinosaurs').click(() => {
    addButton.hideaddbutton();
    dinoList.displayDinos();
  });
  $('#staff').click(() => {
    addButton.hideaddbutton();
    staffList.displayStaff().then(() => {
      const user = auth.getUser();
      if (user !== null) {
        showEditDelete();
        editDeleteEventListeners();
      } else {
        hideEditDelete();
      }
    });
  });
  $('#equipment').click(() => {
    addButton.hideaddbutton();
    equipList.displayEquipCollection().then(() => {
      const user = auth.getUser();
      if (user !== null) {
        showEditDelete();
        editDeleteEventListeners();
      } else {
        hideEditDelete();
      }
    });
  });
  $('#rides').click(() => {
    addButton.hideaddbutton();
    rideList.displayRides().then(() => {
      const user = auth.getUser();
      if (user !== null) {
        showEditDelete();
        editDeleteEventListeners();
      } else {
        hideEditDelete();
      }
    });
  });
  $('#vendors').click(() => {
    addButton.hideaddbutton();
    vendorList.displayVendors().then(() => {
      const user = auth.getUser();
      if (user !== null) {
        showEditDelete();
        editDeleteEventListeners();
      } else {
        hideEditDelete();
      }
    });
  });
};

export default {
  navBarEventListeners,
  showEditDelete,
  hideEditDelete,
};
