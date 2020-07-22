import vendorData from '../../helpers/data/vendorData';
import utils from '../../helpers/utils';
import checkUser from '../../helpers/data/checkUser';
import './vendorCards.scss';

const displayVendors = () => {
  const collectionNameDiv = $('#collectionName');
  collectionNameDiv.text('Vendors');

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
              <a href="#" class="editCard mr-4 card-link"><i class="fas fa-pen"></i></a>
              <a href="#" class="deleteCard ml-4 card-link"><i class="far fa-trash-alt"></i></a>
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

export default { displayVendors };
