import checkUser from '../../helpers/data/checkUser';
import vendorData from '../../helpers/data/vendorData';
import utils from '../../helpers/utils';
import header from '../consoleHeader/consoleHeader';

import './vendorList.scss';

const vendorIcon = (type) => {
  let icon = '';
  switch (type) {
    case 'Restaurant':
      icon = 'fas fa-utensils';
      break;
    case 'Cart':
      icon = 'fas fa-caravan';
      break;
    case 'Gift Shop':
      icon = 'fas fa-gifts';
      break;
    case 'Arcade':
      icon = 'fas fa-gamepad';
      break;
    default:
      icon = 'fa-question';
  }
  return `<i class="${icon} fa-5x text-secondary m-4"></i>`;
};

const addVendorForm = () => {
  const domString = `
  <div class="modal" id="addVendorModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">New Vendor</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
    <form id="vendorAddForm" class="px-4 py-3">
      <div class="form-group">
        <label for="addVendorName">Vendor Name</label>
        <input type="text" class="form-control" name="addVendorName">
      </div>
      <div class="form-group">
        <label for="addVendorType">Type</label>
        <select name="addVendorType" class="form-control">
          <option value="Restaurant">Restaurant</option>
          <option value="Gift Shop">Gift Shop</option>
          <option value="Arcade">Arcade</option>
          <option value="Cart">Cart</option>
          <option value="Misc">(Other)</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Save</button>
    </form>
    </div>
    </div>
  </div>
</div>`;
  return domString;
};

// Checks for Vendors that have no assigned staff and hides all others

const unattendedVendors = (e) => {
  vendorData.getVendorsWithAssignees()
    .then((vendors) => {
      if (e.target.checked === true) {
        vendors.forEach((vendor) => {
          if (vendor.assignees.length > 0) {
            $(`#${vendor.id}`).closest('.card').addClass('hide-assigned');
          }
        });
      } else if (e.target.checked === false) {
        $('.card').removeClass('hide-assigned');
      }
    })
    .catch((err) => console.error('Getting assignees for vendors did not work -> ', err));
};

const displayVendors = () => {
  header.headerBuilder('Vendors');
  if (checkUser.checkUser()) {
    utils.printToDom('#addForm', addVendorForm());
  }

  vendorData.getVendorsWithAssignees()
    .then((vendorsArr) => {
      let domString = `
      <div class="form-check unassigned-box">
        <input class="form-check-input" type="checkbox" value="" id="unattended-vendors">
        <label class="form-check-label" for="unattended-vendors">
          See Unattended Vendors
        </label>
      </div>
      <div class="cardCollection"> 
      `;
      vendorsArr.forEach((vendor) => {
        let assignees = '';
        if (vendor.assignees.length > 0) {
          for (let i = 0; i < vendor.assignees.length; i += 1) {
            assignees += vendor.assignees[i].name;
            if (i + 1 < vendor.assignees.length && vendor.assignees.length !== 1) assignees += ', ';
          }
        }
        domString += `
        <div class="card align-items-center m-3" style="width: 18rem;" id="${vendor.id}">
        ${vendorIcon(vendor.type)}
          <div class="card-body">
            <h5 class="card-title">${vendor.name}</h5>
            <p class="card-text text-secondary">${vendor.type}</p>
            <p class="card-text">${assignees ? `Assigned to:  ${assignees}` : '<span class="text-danger"><i class="fas fa-exclamation-triangle"></i> currently unassigned</span>'}</p>`;
        if (checkUser.checkUser()) {
          domString += `
            <div class="links card-text text-center">
              <a href="#" class="editVendor mr-4 card-link"><i class="fas fa-pen"></i></a>
              <a href="#" class="deleteVendor ml-4 card-link"><i class="far fa-trash-alt"></i></a>
            </div>`;
        }
        domString += `
          </div>
        </div>`;
      });
      domString += '</div>';
      utils.printToDom('#displayCards', domString);
      utils.setState('vendors');
    })
    .catch((err) => console.error('getting the vendors did not work -> ', err));
};

const addVendor = (e) => {
  e.preventDefault();
  const tempVendorObj = {
    name: e.target.elements.addVendorName.value,
    type: e.target.elements.addVendorType.value,
  };
  vendorData.addVendor(tempVendorObj).then(() => {
    $('#addVendorModal').modal('hide');
    displayVendors();
  })
    .catch((err) => console.error('adding new vendors did not work -> ', err));
};

export default { displayVendors, addVendor, unattendedVendors };
