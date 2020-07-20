import utils from '../../helpers/utils';
import equipData from '../../helpers/data/equipData';
import rideData from '../../helpers/data/rideData';

const showDetailedCard = (e) => {
  e.preventDefault();
  const collectionId = e.target.closest('.card').id;
  const collectionName = utils.getActive();
  // console.warn(collectionName);
  switch (collectionName) {
    case 'equipment':
      // console.warn('do delete staff member by id');
      equipData.getEquipById(collectionId)
        .then((response) => {
          const equip = response.data;

          const domString = `  
            
                <div class="d-flex justify-content-center">
                    <div class="card mt-5" style="width: 48rem;" id=${collectionId}>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-6">
                                <div class="d-flex justify-content-center">
                                <div class="card mb-2" border-radius:20px;">
                                <img class="card-img-top" src="${equip.equipImgUrl}" alt="Card image cap">
                                </div>           
                                </div> 
                                </div>
                                <div class="col-6">
                                <a href="#" class="btn btn-outline-dark backButton mb-2"><i class="fas fa-arrow-left"></i></a>
                                <h1>${equip.equipName}</h1>
                                <h5>${equip.equipType}</h5>
                                <h5>${equip.equipLocation}</h5>
                                </div>
                            </div>
                        </div>
                    </div>                
                </div>
                   
            `;
          utils.printToDom('#addForm', domString);
          $('#addButtonDiv').addClass('d-none');
          const addformElement = $('#addForm');
          if (addformElement.hasClass('hide')) {
            addformElement.removeClass('hide');
          }
        })
        .catch((err) => console.error('get single equipment failed', err));
      break;
    case 'rides':
      rideData.getRideById(collectionId)
        .then((response) => {
          const ride = response.data;

          const domString = `  
            
                <div class="d-flex justify-content-center">
                    <div class="card mt-5" style="width: 48rem;" id=${collectionId}>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-6">
                                <div class="d-flex justify-content-center">
                                <div class="card mb-2" border-radius:20px;">
                                <img class="card-img-top" src="${ride.rideImgUrl}" alt="Card image cap">
                                </div>           
                                </div> 
                                </div>
                                <div class="col-6">
                                <a href="#" class="btn btn-outline-dark backButton mb-2"><i class="fas fa-arrow-left"></i></a>
                                <h1>${ride.rideName}</h1>
                                <h5>${ride.rideType}</h5>
                                <h5>${ride.rideLocation}</h5>
                                </div>
                            </div>
                        </div>
                    </div>                
                </div>
                   
            `;
          utils.printToDom('#addForm', domString);
          $('#addButtonDiv').addClass('d-none');
          const addformElement = $('#addForm');
          if (addformElement.hasClass('hide')) {
            addformElement.removeClass('hide');
          }
        })
        .catch((err) => console.error('get single ride failed', err));
      break;
    default:
        // console.warn('this is just defulte');
  }
};

export default { showDetailedCard };
