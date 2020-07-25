import vendorData from '../../helpers/data/vendorData';
import vendorList from './vendorList';
import utils from '../../helpers/utils';

const editVendorDomStringBuilder = (collectionId, vendorObj) => {
  const domString = `            
    <form class="edit-vendor m-5 editVendorForm">
      <h2>Edit Vendor</h2>
      <div class="form-group">
        <label for="editVendorName">Name:</label>
        <input type="text" class="form-control" name="editVendorName" placeholder="Vendor Name" value=${vendorObj.vendorName}>
      </div>
      <div class="form-group">
        <label for="editVendorType">Type:</label>
        <input type="text" class="form-control" name="editVendorType" placeholder="Cashier" value=${vendorObj.vendorType}>
      </div>
      <div class="form-group">
        <label for="editVendorImgUrl">Image URL</label>
        <input type="text" class="form-control" name="editVendorImgUrl" placeholder="Image URL" value=${vendorObj.vendorImgUrl}>
      </div>
      <input type="hidden" class="form-control" name="collectionId" value=${collectionId}>
      <button type="submit" class="btn btn-primary" id="submitEdit">Update</button>
      <button class="btn btn-warning" id="vendor-editor-cancel">Cancel</button>
    </form>
  `;
  return domString;
};

const editVendor = (e) => {
  e.preventDefault();
  const collectionId = e.target.elements.collectionId.value;
  const tempEditedVendor = {
    vendorName: e.target.elements.editVendorName.value,
    vendorType: e.target.elements.editVendorType.value,
    vendorImgUrl: e.target.elements.editVendorImgUrl.value,
  };
  vendorData.updateVendor(collectionId, tempEditedVendor)
    .then(() => {
      vendorList.displayVendors();
    });
};

const cancelEdit = () => {
  vendorList.displayVendors();
  $('#addForm').addClass('hide');
};

const vendorEditForm = (e) => {
  const collectionId = e.target.closest('.card').id;

  vendorData.getVendorById(collectionId)
    .then((response) => {
      const vendor = response.data;
      const domString = editVendorDomStringBuilder(collectionId, vendor);

      utils.printToDom('#addForm', domString);
      $('#addForm').removeClass('hide');
      $('#addButtonDiv').removeClass('d-none');
    })
    .catch((err) => console.warn(err));
};

export default { editVendor, vendorEditForm, cancelEdit };
