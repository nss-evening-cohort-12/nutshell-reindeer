import auth from '../auth/auth';

import dinoList from '../listView/dinoList';
import addButton from '../add/addButton';
import staffList from '../listView/staffList';
import equipList from '../listView/equipList';

import utils from '../../helpers/utils';

import staffData from '../../helpers/data/staffData';
import dinoData from '../../helpers/data/dinoData';
import equipData from '../../helpers/data/equipData';
import detailCardBuilder from '../detailsView/detailCardBuilder';
import editButton from '../edit/editButton';

const removeExecute = (e) => {
  // console.warn('excute remove event');
  const collectionId = e.target.closest('.card').id;
  // console.warn(collectionId);
  const collectionName = utils.getActive();
  // console.warn(collectionName);
  switch (collectionName) {
    case 'staff':
      // console.warn('do delete staff member by id');
      staffData.deleteStaffById(collectionId)
        .then(() => {
          $(`#${utils.getActive()}`).click();
        })
        .catch((err) => console.error('could not delete board ', err));
      break;
    case 'dinosaurs':
      dinoData.deleteDinosById(collectionId)
        .then(() => {
          $(`#${utils.getActive()}`).click();
        })
        .catch((err) => console.error('could not delete board ', err));
      break;
    case 'equipment':
      // console.warn('do delete staff member by id');
      equipData.deleteEquipById(collectionId)
        .then(() => {
          $(`#${utils.getActive()}`).click();
        })
        .catch((err) => console.error('could not delete this equipment Card ', err));
      break;
    default:
      // console.warn('this is just defulte');
  }
};

const editDeleteEventListeners = () => {
  $('body').on('click', '.editCard', editButton.editButtonEvent);
  $('.deleteCard').click(removeExecute);
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
  $('body').on('click', '.viewCard', detailCardBuilder.showDetailedCard);
  $('body').on('click', '.backButton', () => {
    utils.printToDom('#addForm', '');
    $('#addForm').addClass('hide');
  });
  $('#dinosaurs').click(() => {
    addButton.hideaddbutton();
    dinoList.displayDinos().then(() => {
      const user = auth.getUser();
      if (user !== null) {
        showEditDelete();
        editDeleteEventListeners();
      } else {
        hideEditDelete();
      }
    });
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
};

export default { navBarEventListeners, showEditDelete, hideEditDelete };
