import './cardFactoryVendors.scss';

// create card domstrings here

const makeVendorCard = (vendor) => {
  const domString = `<div class="card align-items-center m-3" style="width: 18rem;" id="${vendor.id}">
  <img src="${vendor.vendorImgUrl}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Vendor Name: ${vendor.vendorName}</h5>
    <p class="card-text">Vendor Type: ${vendor.vendorType}</p>
    <div class="links card-text text-center">
    <a href="#" class="editCard mr-4 card-link hide"><i class="fas fa-pen"></i></a>
    <a href="#" class="viewCard m-4 card-link"><i class="fas fa-search"></i></a>
    <a href="#" class="deleteCard ml-4 card-link hide"><i class="far fa-trash-alt"></i></a>
    </div>
  </div>
</div>`;
  return domString;
};

export default { makeVendorCard };
