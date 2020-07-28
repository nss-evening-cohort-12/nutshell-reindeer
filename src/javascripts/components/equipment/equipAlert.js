import equipData from '../../helpers/data/equipData';
import utils from '../../helpers/utils';

const equipCheck = () => {
  equipData.getAllEquipment()
    .then((allEquip) => {
      const brokenEquip = [];

      allEquip.forEach((equip) => {
        if (!equip.isOperational) {
          brokenEquip.push(`${equip.name} `);
        }
      });

      let domString = `
      <div aria-live="polite" aria-atomic="true" style="position: absolute; top: 0; right: 0; min-width: 300px; ">
      <div class="toast" style="position: absolute; top: 0; right: 0;" data-delay="3000">
        <div class="toast-header">
        <strong class="mr-auto">Broken Equipment!</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">`;
      if (brokenEquip.length === 0) {
        domString += 'Nothing is broken, but watch out for the Chaos Monkeys!!';
      } else if (brokenEquip.length < 5) {
        domString += `Warning!! ${brokenEquip} is broken!`;
      } else {
        domString += `Warning!! Choas monkeys have destroyed ${brokenEquip.length} pieces of equipment!`;
      }

      domString += `</div>
      </div>
    </div>
      `;
      utils.printToDom('#toastDiv', domString);
      $('.toast').toast('show');
    })
    .catch((err) => console.error(err));
};

export default { equipCheck };
