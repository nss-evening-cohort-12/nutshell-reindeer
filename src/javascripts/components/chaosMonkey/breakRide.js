import staffData from '../../helpers/data/staffData';
import utils from '../../helpers/utils';
import monkeyData from '../../helpers/data/monkeyData';
import rideData from '../../helpers/data/rideData';

const breakRide = () => new Promise((resolve, reject) => {
  rideData.getAllRides()
    .then((rideList) => {
      const breakableRides = rideList.filter((actives) => actives.rideOperational === true); // get only the staff with isActive == true
      const brokenRide = breakableRides[utils.randomNum(0, breakableRides.length)]; // select a single random staff member from that list
      console.error(brokenRide);
      rideData.patchRide(brokenRide.id, { rideOperational: false })
        .then(() => {
          staffData.getStaff()
            .then((staff) => {
              const assignedStaff = staff.find((staffMember) => staffMember.assignedTo === brokenRide.id);
              if (assignedStaff) {
                staffData.patchStaff(assignedStaff.id, { assignedTo: '', assignmentCategory: '' });
              }
              monkeyData.addMonkeyLog({ dateTime: Date.now(), message: `The Chaos Monkey has broken the ${brokenRide.name} ride.` });
            });
        });
      resolve(`The Chaos Monkey has broken the ${brokenRide.name} ride!`);
    })
    .catch((err) => reject(err));
});

export default { breakRide };
