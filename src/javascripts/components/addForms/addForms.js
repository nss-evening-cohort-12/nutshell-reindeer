const dinoAddForm = () => {
  const domString = `
  <form class="px-4 py-3">
    <div class="form-group">
    <label for="addDinoName">Dinosaur Name</label>
    <input type="text" class="form-control" id="addDinoName">
  </div>
  <div class="form-group">
    <label for="addDinoType">Dinosaur Type</label>
    <input type="text" class="form-control" id="addDinoId">
  </div>
  <div class="form-group">
    <label for="addDinoImgUrl">Dinosaur Image URL</label>
    <input type="url" class="form-control" id="addDinoId">
  </div>
  <div class="form-group">
  <label for="addDinoSize">Dinosaur Size</label>
  <input type="text" class="form-control" id="addDinoSize">
</div>
    <button type="addButton" class="btn btn-primary">Submit</button>
  </form>`;
  return domString;
};

const junkTestForm = () => {
  const domString = `
  <span class="dropdown-item-text">Dropdown item text</span>
  <a class="dropdown-item" href="#">Action</a>
  <a class="dropdown-item" href="#">Another action</a>
  <a class="dropdown-item" href="#">Something else here</a>`;
  return domString;
};

export default { dinoAddForm, junkTestForm };
