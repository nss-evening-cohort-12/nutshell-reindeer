import vendorData from '../../helpers/data/vendorData';
import utils from '../../helpers/utils';

const editVendor = (e) => {
  e.preventDefault();
  const collectionId = e.target.closest('.editForm').id;

  const tempEditedVendor = {
    vendorName: $('#edit-vendor-name').val(),
    vendorType: $('#edit-vendor-type').val(),
    vendorImgUrl: $('#edit-vendor-imgUrl').val(),
  };
  // pass those to an update vendor data function
  vendorData.updateVendor(collectionId, tempEditedVendor)
    .then(() => {
      $(`#${utils.getActive()}`).click();
      $('#addButtonDiv').removeClass('d-none');
    });
};

export default { editVendor };
