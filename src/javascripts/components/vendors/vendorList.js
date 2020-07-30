import checkUser from '../../helpers/data/checkUser';
import vendorData from '../../helpers/data/vendorData';
import utils from '../../helpers/utils';
import header from '../consoleHeader/consoleHeader';
import addButton from '../addButton/addButton';

import './vendorList.scss';

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
        <label for="addVendorType">Vendor Type</label>
        <input type="text" class="form-control" name="addVendorType">
      </div>
      <div class="form-group">
        <label for="addVendorImgUrl">Vendor Image URL</label>
        <input type="url" class="form-control" name="addVendorImgUrl">
      </div>
      <button type="submit" class="btn btn-primary">Build!</button>
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
    addButton.buttonDiv('Build New Vendor');
  }
  vendorData.getVendorsWithAssignees()
    .then((vendorsArr) => {
      let domString = `
      <div class="custom-control custom-switch">
      <input class="custom-control-input" type="checkbox" value="" id="unattended-vendors">
      <label class="custom-control-label" for="unattended-vendors">
          See Unattended Vendors
        </label>
      </div>
      <div class="cardCollection"> 
      `;
      vendorsArr.forEach((vendor) => {
        let assignees = 'unassigned';
        if (vendor.assignees.length > 0) {
          assignees = '';
          vendor.assignees.forEach((assignee) => {
            assignees += `<p>${assignee.name}`;
          });
        }
        domString += `
        <div class="card align-items-center m-3" style="width: 18rem;" id="${vendor.id}">
          <img src="${vendor.vendorImgUrl}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Vendor Name: ${vendor.name}</h5>
            <p class="card-text">Vendor Type: ${vendor.vendorType}</p>
            <p class="card-text">Assigned to: 
            ${assignees}</p>`;
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
    vendorType: e.target.elements.addVendorType.value,
    vendorImgUrl: e.target.elements.addVendorImgUrl.value,
  };
  vendorData.addVendor(tempVendorObj).then(() => {
    $('#addVendorModal').modal('hide');
    displayVendors();
  })
    .catch((err) => console.error('adding new vendors did not work -> ', err));
};

export default { displayVendors, addVendor, unattendedVendors };
