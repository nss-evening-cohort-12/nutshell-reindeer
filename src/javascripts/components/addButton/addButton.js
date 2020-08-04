import utils from '../../helpers/utils';

// const buttonDiv = (name) => {
//   const domString = `
//   <button id="addButton" type="button" data-toggle="modal" data-target="exampleModal" class="btn btn-warning btn-large">
//           <i class="fas fa-plus-circle fa-lg"><div>${name}</div></i>
//         </button>
//   `;
//   utils.printToDom('#addButtonDiv', domString);
//   $('#addButtonDiv').removeClass('hide-assigned');
// };

const buttonDiv = (name) => {
  const domString = `
  <div id="addButton" type="button" data-toggle="modal" data-target="exampleModal">
    <span class="text-light"><i class="fas fa-plus-circle fa-lg"></i></span> ${name} 
  </div>
  `;
  utils.printToDom('#addButtonDiv', domString);
  $('#addButtonDiv').removeClass('hide-assigned');
};

export default { buttonDiv };
