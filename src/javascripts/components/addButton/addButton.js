// import utils from '../../helpers/utils';

import addForms from '../addForms/addForms';
import utils from '../../helpers/utils';

const whichform = (id) => {
  console.warn(id);
  switch (id) {
    case 'dinosaurs':
      return addForms.dinoAddForm();
    default:
      return addForms.junkTestForm();
  }
};

const makeDropdown = () => {
  const dropDownElement = whichform(utils.getActive());
  console.warn(dropDownElement);
  utils.printToDom('#addDropDown', dropDownElement);
};

const addButtonEvent = () => {
  makeDropdown();
  $('#addButtonDiv').dropdown();
};

export default { addButtonEvent };
