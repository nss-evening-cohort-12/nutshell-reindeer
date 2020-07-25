import equipData from '../../helpers/data/equipData';
import equipList from './equipList';

const deleteEquip = (e) => {
  console.error('hi');
  const collectionId = e.target.closest('.card').id;
  equipData.deleteEquipById(collectionId)
    .then(() => {
      equipList.displayEquipCollection();
    })
    .catch((err) => console.error('could not delete staff member ', err));
};

export default { deleteEquip };
