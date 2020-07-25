import vendorList from './vendorList';
import vendorData from '../../helpers/data/vendorData';

const deleteVendor = (e) => {
  const collectionId = e.target.closest('.card').id;
  vendorData.deleteVendorById(collectionId)
    .then(() => {
      vendorList.displayVendors();
    })
    .catch((err) => console.error('could not delete vendor -> ', err));
};

export default { deleteVendor };
