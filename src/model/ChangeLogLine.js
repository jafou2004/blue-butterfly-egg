export default class ChangeLogLine {
  constructor(vesrion, date) {
    this.version = vesrion;
    this.date = date;
    this.changes = [];
  }

  addChanges = (change) => {
    this.changes.push(change);
  };
}
