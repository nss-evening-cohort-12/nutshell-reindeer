import utils from '../../helpers/utils';
import staffData from '../../helpers/data/staffData';
import equipData from '../../helpers/data/equipData';
import rideData from '../../helpers/data/rideData';
// import 'bootstrap';

const toastFunction = (message) => {
  const domString = `
  <div class="toast" data-delay="10000" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSJDxUYMNRC2nEIVJRZ7yIYnH7epWQ0Bl_Lqg&usqp=CAU" class="rounded mr-2" alt="...">
    <strong class="mr-auto">Bootstrap</strong>
    <small>Random mins ago</small>
    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="toast-body">
    ${message}
  </div>
</div>
  `;
  utils.printToDom('#toast1', domString);
  $('.toast').toast('show');
};

const getRandomInt = (min, max) => {
  const min1 = Math.ceil(min);
  const max1 = Math.floor(max);
  return Math.floor(Math.random() * (max1 - min1)) + min1;
};

const kidnapRandomStaff = () => {
  staffData.getStaff()
    .then((response) => {
      const staffArr = utils.convertFirebaseCollection(response.data);
      const filteredStaffArr = staffArr.filter((item) => item.isActive === 'true');
      // console.warn(staffArr);
      // console.warn(filteredStaffArr.length);
      if (filteredStaffArr.length > 0) {
        const getRandomNumber = getRandomInt(0, filteredStaffArr.length);
        const staffId = filteredStaffArr[getRandomNumber].id;

        staffData.getStaffById(staffId)
          .then((staffObj) => {
            const tempObj = staffObj.data;
            tempObj.isActive = 'false';
            staffData.updateStaff(staffId, tempObj)
              .then(() => {
                const message = `Chaos Monkey just kidnapped a staff member ${tempObj.name}`;
                toastFunction(message);
                $(`#${utils.getActive()}`).click();
              });
          });
      }
    })
    .catch((err) => console.warn(err));
};

const breakRandomEquip = () => {
  equipData.getAllEquipment()
    .then((response) => {
      const equipArr = utils.convertFirebaseCollection(response.data);
      const filteredEquipArr = equipArr.filter((item) => item.equipOperational === true);
      // console.warn(equipArr);
      // console.warn(filteredEquipArr.length);
      if (filteredEquipArr.length > 0) {
        const getRandomNumber = getRandomInt(0, filteredEquipArr.length);
        const equipId = filteredEquipArr[getRandomNumber].id;

        equipData.getEquipById(equipId)
          .then((equipObj) => {
            const tempObj = equipObj.data;
            tempObj.equipOperational = false;
            equipData.updateEquipment(equipId, tempObj)
              .then(() => {
                const message = `Chaos Monkey just broke ${tempObj.name} equipment`;
                toastFunction(message);
                $(`#${utils.getActive()}`).click();
              });
          });
      }
    })
    .catch((err) => console.warn(err));
};

const breakRandomRide = () => {
  rideData.getAllRides()
    .then((response) => {
      const ridesArr = utils.convertFirebaseCollection(response.data);
      const filteredRidesArr = ridesArr.filter((item) => item.rideOperational === true);
      // console.warn(rideArr);
      // console.warn(filteredRidesArr.length);
      if (filteredRidesArr.length > 0) {
        const getRandomNumber = getRandomInt(0, filteredRidesArr.length);
        const rideId = filteredRidesArr[getRandomNumber].id;

        rideData.getRideById(rideId)
          .then((rideObj) => {
            const tempObj = rideObj.data;
            tempObj.rideOperational = false;
            rideData.updateRide(rideId, tempObj)
              .then(() => {
                const message = `Chaos Monkey just broke ${tempObj.name} ride`;
                toastFunction(message);
                $(`#${utils.getActive()}`).click();
              });
          });
      }
    })
    .catch((err) => console.warn(err));
};

const randomActivity = () => {
  const randomActivityNumber = getRandomInt(1, 4);
  // const randomActivityNumber = 1;
  switch (randomActivityNumber) {
    case 1:
      kidnapRandomStaff();
      break;
    case 2:
      breakRandomEquip();
      break;
    case 3:
      breakRandomRide();
      break;
    default:
      console.warn('no add function yet');
  }
};

const bringChaosMonkey = () => {
  const randomTime = getRandomInt(5000, 15000);
  setTimeout(randomActivity, randomTime);
  // console.warn(randomTimer);
};

export default { bringChaosMonkey };
