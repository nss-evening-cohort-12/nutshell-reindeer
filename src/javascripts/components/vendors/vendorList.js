import checkUser from '../../helpers/data/checkUser';
import vendorData from '../../helpers/data/vendorData';
import utils from '../../helpers/utils';

import './vendorList.scss';

const addVendorForm = () => {
  const domString = `
  <div class="modal fade" id="addVendorModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

const displayVendors = () => {
  $('#collectionName').text('Vendors');
  if (checkUser.checkUser()) {
    utils.printToDom('#addForm', addVendorForm());
  }

  vendorData.getVendors()
    .then((vendorsArr) => {
      let domString = '<div class="d-flex flex-wrap">';
      vendorsArr.forEach((vendor) => {
        domString += `
        <div class="card align-items-center m-3" style="width: 18rem;" id="${vendor.id}">
          <img src="${vendor.vendorImgUrl}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Vendor Name: ${vendor.vendorName}</h5>
            <p class="card-text">Vendor Type: ${vendor.vendorType}</p>`;

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
    })
    .catch((err) => console.error('getting the vendors did not work -> ', err));
};

const addVendor = (e) => {
  e.preventDefault();
  $('#addVendorModal').modal('hide');
  const tempVendorObj = {
    vendorName: e.target.elements.addVendorName.value,
    vendorType: e.target.elements.addVendorType.value,
    vendorImgUrl: e.target.elements.addVendorImgUrl.value,
  };
  vendorData.addVendor(tempVendorObj).then(() => {
    displayVendors();
  })
    .catch((err) => console.error('adding new vendors did not work -> ', err));
};

export default { displayVendors, addVendor };
