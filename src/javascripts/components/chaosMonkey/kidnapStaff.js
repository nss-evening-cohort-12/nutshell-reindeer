import staffData from '../../helpers/data/staffData';
import utils from '../../helpers/utils';

const kidnapStaff = () => {
  staffData.getStaff()
    .then((staffList) => {
      const kidnappableStaff = staffList.filter((actives) => actives.isActive === true);
      const kidnappedStaff = kidnappableStaff[utils.randomNum(0, kidnappableStaff.length)];
      console.error(kidnappedStaff);
      staffData.patchStaff(kidnappedStaff.id, { isActive: false });
    })
    .catch((err) => console.error(err));
};

export default { kidnapStaff };
