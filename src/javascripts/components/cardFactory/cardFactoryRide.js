import './cardFactoryRide.scss';

// create card domstrings here

const makeSingleRideCard = (ride) => {
  let domString = `<div id="${ride.id}" class="card align-items-center m-3" style="width: 18rem;">
  <img src="${ride.rideImgUrl}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Ride Name: ${ride.rideName}</h5>
    <p class="card-text">Ride Type: ${ride.rideType}</p>
    <p class="card-text">Ride Location: ${ride.rideLocation}</p>`;
  const isTrueSet = (ride.rideOperational === true);
  if (isTrueSet) {
    domString += '<p class="card-text">Operational: <i class="fas fa-thumbs-up" style="color:green;"></i></p>';
  } else {
    domString += '<p class="card-text">Operational: <i class="fas fa-thumbs-down" style="color:red;"></i></p>';
  }
  domString += `
    <div class="links card-text text-center">
    <a href="#" class="editCard mr-4 card-link hide"><i class="fas fa-pen"></i></a>
    <a href="#" class="viewCard m-4 card-link"><i class="fas fa-search"></i></a>
    <a href="#" class="deleteCard ml-4 card-link hide"><i class="far fa-trash-alt"></i></a>
    </div>
  </div>
</div>`;
  return domString;
};

export default { makeSingleRideCard };
