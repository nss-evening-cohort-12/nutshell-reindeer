const staffAddForm = () => {
  const domString = `
  <form id="staffAddForm" class="px-4 py-3">
    <div class="form-group">
    <label for="addStaffName">Staff Name</label>
    <input type="text" class="form-control" id="addStaffName">
  </div>
  <div class="form-group">
    <label for="addStaffTitle">Staff Title</label>
    <input type="text" class="form-control" id="addStaffTitle">
  </div>
  <div class="form-group">
    <label for="addStaffImgUrl">Staff Image URL</label>
    <input type="url" class="form-control" id="addStaffImgUrl">
  </div>
    <button id="submitAdd" class="btn btn-primary">Submit</button>
  </form>`;
  return domString;
};

const junkTestForm = () => {
  const domString = '<h1>No Add Form for This Collection yet</h1>';
  return domString;
};

export default {
  junkTestForm,
  staffAddForm,
};
