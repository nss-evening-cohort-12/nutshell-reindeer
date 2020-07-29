import firebase from 'firebase/app';
import dinoList from '../components/dinos/dinoList';
import equipList from '../components/equipment/equipList';
import rideList from '../components/rides/rideList';
import vendorList from '../components/vendors/vendorList';
import staffList from '../components/staff/staffList';
import editDino from '../components/dinos/editDino';
import editRide from '../components/rides/editRide';
import editStaff from '../components/staff/editStaff';
import deleteStaff from '../components/staff/deleteStaff';
import editEquip from '../components/equipment/editEquipment';
import deleteEquipment from '../components/equipment/deleteEquipment';
import editVendor from '../components/vendors/editVendor';
import deleteVendor from '../components/vendors/deleteVendor';
// import causeChaos from '../components/chaosMonkey/causeChaos';
import assignStaff from '../components/staff/assignStaff';
import equipTest from '../components/equipment/equipAlert';
import LogButtons from '../components/auth/auth';

// const showAddForm = () => {
//   $('#addForm').removeClass('hide');
// };

const showModal = () => {
  $('#addEquipModal').modal();
  $('#addRideModal').modal();
  $('#addStaffModal').modal();
  $('#addVendorModal').modal();
  $('#addDinoModal').modal();
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
    vendorList.displayVendors();
  });
};

const clickEvents = () => {
  navBarEventListeners();
  firebase.auth().onAuthStateChanged((user) => {
    $('body').on('click', '#google-auth', LogButtons.signMeIn);
    $('body').on('click', '#logoutButton', LogButtons.logoutEvent);
    if (user) {
      // -----> Project <-----
      // $('body').click(() => { // Comment this out to turn off chaos monkey temporarily
      //   causeChaos.decreaseChaos();
      // });
      // $('body').on('click', '#addButton', showAddForm);
      $('body').on('click', '#addButton', showModal);
      $('body').on('click', '#testButton', equipTest.equipCheck);
      //----------------------

      // -----> Dinos <-----
      $('body').on('submit', '#dinoAddForm', dinoList.addDino);
      $('body').on('submit', '.editDinoForm', editDino.editDino);
      $('body').on('click', '.editDino', editDino.dinoEditForm);
      $('body').on('click', '#unattended-dinos', dinoList.unattendedDinos);
      $('body').on('click', '#save-handler-updates', dinoList.displayDinos);
      //----------------------

      // -----> Equipment <-----
      $('body').on('submit', '#equipAddForm', equipList.addEquipment);
      $('body').on('submit', '.editEquipForm', editEquip.editEquipment);
      $('body').on('click', '.editEquip', editEquip.equipmentEditForm);
      $('body').on('click', '.deleteEquip', deleteEquipment.deleteEquip);
      // eslint-disable-next-line func-names
      // $('body').on('click', '.assignEquipOption', (function () {
      //   console.warn($(this).text());
      // }));
      $('body').on('click', '.assignEquipOption', editEquip.assignEquipment);
      $('body').on('click', '#unattended-equip', equipList.unattendedEquip);

      //----------------------

      // -----> Rides <-----
      $('body').on('submit', '.editRideForm', editRide.editRide);
      $('body').on('click', '.editRide', editRide.rideEditForm);
      $('body').on('click', '.deleteRide', rideList.deleteRide);
      $('body').on('submit', '#addRideForm', rideList.addRide);
      $('body').on('click', '#ride-editor-cancel', rideList.displayRides);
      $('body').on('click', '#unattended-rides', rideList.unattendedRides);
      //----------------------

      // -----> Staff <-----
      $('body').on('submit', '.editStaffForm', editStaff.editStaff);
      $('body').on('click', '.editStaff', editStaff.staffEditForm);
      $('body').on('click', '.deleteStaff', deleteStaff.deleteStaff);
      $('body').on('submit', '#staffAddForm', staffList.addStaff);
      $('body').on('click', '#staff-editor-cancel', editStaff.cancelEdit);
      $('body').on('click', '.assignStaff', assignStaff.assignStaff);
      $('body').on('click', '#unassigned-staff', staffList.unassignedStaff);
      $('body').on('click', '#submit-assignment', assignStaff.assignSelectedJob);
      //----------------------

      // -----> Vendors <-----
      $('body').on('submit', '#vendorAddForm', vendorList.addVendor);
      $('body').on('submit', '.editVendorForm', editVendor.editVendor);
      $('body').on('click', '.editVendor', editVendor.vendorEditForm);
      $('body').on('click', '#vendor-editor-cancel', editVendor.cancelEdit);
      $('body').on('click', '.deleteVendor', deleteVendor.deleteVendor);
      $('body').on('click', '#unattended-vendors', vendorList.unattendedVendors);
      //----------------------
    }
  });
};

export default { clickEvents };
