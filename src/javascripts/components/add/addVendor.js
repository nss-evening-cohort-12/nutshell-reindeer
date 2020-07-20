import vendorData from '../../helpers/data/vendorData';
import utils from '../../helpers/utils';

const addVendor = () => {
  const tempVendorOjb = {
    vendorName: $('#addVendorName').val(),
    vendorType: $('#addVendorType').val(),
    vendorImgUrl: $('#addVendorImgUrl').val(),
  };
  vendorData.addVendor(tempVendorOjb).then(() => {
    $(`#${utils.getActive()}`).click();
    $('#addButton').click();
  });
};

export default { addVendor };
