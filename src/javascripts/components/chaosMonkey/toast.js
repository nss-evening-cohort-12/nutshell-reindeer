import utils from '../../helpers/utils';
// import 'bootstrap';

const toastFunction = () => {
  const domString = `
  <div class="toast" data-delay="10000" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
    <img src="..." class="rounded mr-2" alt="...">
    <strong class="mr-auto">Bootstrap</strong>
    <small>11 mins ago</small>
    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="toast-body">
    Hello, world! This is a toast message.
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

const toastTimer = () => {
  const pickCollectionItem = getRandomInt(1, 3);
  console.warn(pickCollectionItem);
  const randomTimer = getRandomInt(5000, 15000);
  setTimeout(toastFunction, randomTimer);
  // console.warn(randomTimer);
};
// console.log(getRandomInt(3));

export default { toastTimer };
