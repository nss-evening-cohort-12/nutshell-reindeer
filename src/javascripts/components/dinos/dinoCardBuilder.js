import './dinoCards.scss';

// create card domstrings here

const makeDinoCard = (dino) => {
  const domString = `<div class="card align-items-center m-3" style="width: 18rem;" id="${dino.id}">
  <img src="${dino.dinoImgUrl}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Dinosauar Name: ${dino.dinoName}</h5>
    <p class="card-text">Dinosaur Type: ${dino.dinoType}</p>
    <div class="links authOnly card-text text-center">
      <a href="#" class="editCard mr-4 card-link hide"><i class="fas fa-pen"></i></a>
      <a href="#" class="viewCard m-4 card-link"><i class="fas fa-search"></i></a>
      <a href="#" class="deleteCard ml-4 card-link hide"><i class="far fa-trash-alt"></i></a>
    </div>
  </div>
</div>`;
  return domString;
};

export default { makeDinoCard };
