const dinoAddForm = () => {
  const domString = `
  <form id="dinoAddForm" class="px-4 py-3">
    <div class="form-group">
    <label for="addDinoName">Dinosaur Name</label>
    <input type="text" class="form-control" id="addDinoName">
  </div>
  <div class="form-group">
    <label for="addDinoType">Dinosaur Type</label>
    <input type="text" class="form-control" id="addDinoType">
  </div>
  <div class="form-group">
    <label for="addDinoImgUrl">Dinosaur Image URL</label>
    <input type="url" class="form-control" id="addDinoImgUrl">
  </div>
  <div class="form-group">
  <label for="addDinoSize">Dinosaur Size</label>
  <input type="text" class="form-control" id="addDinoSize">
</div>
    <button id="submitAdd" class="btn btn-primary">Submit</button>
  </form>`;
  return domString;
};

const equipAddForm = () => {
  const domString = `
  <form id="equipAddForm" class="px-4 py-3">
    <div class="form-group">
    <label for="addEquipName">Equipment Name</label>
    <input type="text" class="form-control" id="addEquipName">
  </div>
  <div class="form-group">
    <label for="addEquipType">Equipment Type</label>
    <input type="text" class="form-control" id="addEquipType">
  </div>
  <div class="form-group">
    <label for="addEquipImgUrl">Equipment Image URL</label>
    <input type="url" class="form-control" id="addEquipImgUrl">
  </div>
  <div class="form-group">
  <label for="addEquipSize">Equipment Location</label>
  <input type="text" class="form-control" id="addEquipSize">
</div>
    <button id="submitAdd" class="btn btn-primary">Submit</button>
  </form>`;
  return domString;
};

const junkTestForm = () => {
  const domString = '<h1>No Add Form for This Collection yet</h1>';
  return domString;
};

export default { dinoAddForm, junkTestForm, equipAddForm };
