import utils from '../../helpers/utils';

const settingsMenu = () => {
  const domString = `  
  <div class="dropdown dropleft">
    <span class="" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i class="fas fa-cog"></i>
    </span>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" href="#">Action</a>
      <a class="dropdown-item" href="#">Another action</a>
      <a class="dropdown-item" href="#">Something else here</a>
    </div>
  </div>`;
  utils.printToDom('#settings', domString);
};

export default { settingsMenu };
