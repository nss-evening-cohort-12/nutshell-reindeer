import auth from '../auth/auth';

import dinoList from '../listView/dinoList';
import addButton from '../add/addButton';
import staffList from '../listView/staffList';
import equipList from '../listView/equipList';

import utils from '../../helpers/utils';

import equipData from '../../helpers/data/equipData';
import detailCardBuilder from '../detailsView/detailCardBuilder';
import deleteElement from '../delete/deleteElement';

const editExecute = (e) => {
  e.preventDefault();
  // get the id of the equipment (for updating purposes)
  const collectionId = e.target.closest('.edit-equip').id;
  const collectionName = utils.getActive();
  // console.warn(collectionName);
  let isChecked = false;
  let editedEquip;
  switch (collectionName) {
    case 'equipment':
    // create the 'modified' equipment
      if ($('#edit-equip-operational').is(':checked')) {
        isChecked = true;
      } else {
        isChecked = false;
      }
      editedEquip = {
        equipName: $('#edit-equip-name').val(),
        equipType: $('#edit-equip-type').val(),
        equipLocation: $('#edit-equip-location').val(),
        equipImgUrl: $('#edit-equip-imgUrl').val(),
        equipOperational: isChecked,
      };
      // pass those to an update equipment data function
      equipData.updateEquipment(collectionId, editedEquip)
        .then(() => {
          // eslint-disable-next-line no-use-before-define
          equipList.displayEquipCollection().then(() => {
            const user = auth.getUser();
            if (user !== null) {
              // eslint-disable-next-line no-use-before-define
              showEditDelete();
              // eslint-disable-next-line no-use-before-define
              editDeleteEventListeners();
            } else {
              // eslint-disable-next-line no-use-before-define
              hideEditDelete();
            }
            utils.printToDom('#addForm', '');
            $('#addForm').addClass('hide');
          });
        })
        .catch((err) => console.error('could not edit equipment', err));
      break;
    default:
  }
};

const editShowForm = (e) => {
  e.preventDefault();
  // console.warn('excute remove event');
  $('#addButtonDiv').addClass('d-none');
  const collectionId = e.target.closest('.card').id;
  const collectionName = utils.getActive();
  // console.warn(collectionName);
  switch (collectionName) {
    case 'equipment':
      // console.warn('do delete staff member by id');
      equipData.getEquipById(collectionId)
        .then((response) => {
          const addformElement = $('#addForm');
          const equip = response.data;

          let domString = `            
            <form class="edit-equip m-5" id=${collectionId}>
              <h2>Edit Equipment</h2>
              <div class="form-group">
                <label for="edit-equip-name">Name:</label>
                <input type="text" class="form-control" id="edit-equip-name" placeholder="Cordyceps" value=${equip.equipName}>
              </div>
              <div class="form-group">
                <label for="edit-equip-type">Type:</label>
                <input type="text" class="form-control" id="edit-equip-type" placeholder="M" value=${equip.equipType}>
              </div>
              <div class="form-group">
                <label for="edit-equip-location">Location:</label>
                <input type="text" class="form-control" id="edit-equip-location" placeholder="Farm" value=${equip.equipLocation}>
              </div>
              <div class="form-group">
                <label for="edit-equip-imgUrl">Image URL</label>
                <input type="text" class="form-control" id="edit-equip-imgUrl" placeholder="Image URL" value=${equip.equipImgUrl}>
              </div>
              <div class="form-group">
              <div class="form-check">
                `;
          if (equip.equipOperational) {
            domString += '<input class="form-check-input" id="edit-equip-operational" type="checkbox" checked>';
          } else {
            domString += '<input class="form-check-input" id="edit-equip-operational" type="checkbox">';
          }
          domString += `
              <label class="form-check-label" for="edit-equip-operational">Is Operational</label>              
              </div>
              </div>
              <button type="submit" class="btn btn-primary" id="equip-editor">Update</button>
              <button class="btn btn-warning backButton" id="equip-editor-cancel">Cancel</button>
            </form>
          `;
          utils.printToDom('#addForm', domString);
          if (addformElement.hasClass('hide')) {
            addformElement.removeClass('hide');
          }
          $('#equip-editor').click(editExecute);
        })
        .catch((err) => console.error('get single mushroom failed', err));
      break;
    default:
      // console.warn('this is just defulte');
  }
};

const editDeleteEventListeners = () => {
  $('.editCard').click(editShowForm);
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
  // Handles the detail Card builder event
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

export default {
  navBarEventListeners,
  showEditDelete,
  hideEditDelete,
};
