import ChangeLogLine from '../model/ChangeLogLine';
import changelogString from '../../CHANGELOG.md?raw';

let bbePreviousVersion = localStorage.bbe_version;
let stateSwitch100 = localStorage.bbe_stateSwitch100 === 'on';
let stateSwitchCompact = localStorage.bbe_stateSwitchCompact === 'on';

let bbeChangeLog = null;

const switch100 = () => {
  return stateSwitch100;
};
const toggleSwitch100 = () => {
  stateSwitch100 = !stateSwitch100;
  localStorage.bbe_stateSwitch100 = stateSwitch100 ? 'on' : 'off';
};

const switchCompact = () => {
  return stateSwitchCompact;
};

const toggleSwitchCompact = () => {
  stateSwitchCompact = !stateSwitchCompact;
  localStorage.bbe_stateSwitchCompact = stateSwitchCompact ? 'on' : 'off';
};

const previousVersion = () => {
  return bbePreviousVersion;
};

const majVersion = (v) => {
  bbePreviousVersion = v;
  localStorage.bbe_version = v;
};

const loadChangeLog = () => {
  bbeChangeLog = [];
  let currentChange = null;
  const start = /^## \[(.*)\] - (.*$)/m;
  const change = /^- (.*$)/m;
  let lines = changelogString.split(/\n/);
  lines.forEach((line) => {
    if (start.test(line)) {
      let [, version, date] = line.match(start);
      if (currentChange !== null) {
        bbeChangeLog.push(currentChange);
      }
      currentChange = new ChangeLogLine(version, date);
    }
    if (change.test(line)) {
      let [, log] = line.match(change);
      if (currentChange !== null) {
        currentChange.addChanges(log);
      }
    }
  });
  if (currentChange !== null) {
    bbeChangeLog.push(currentChange);
  }
};

const getChangeLog = () => {
  if (bbeChangeLog === null) {
    loadChangeLog();
  }
  return bbeChangeLog;
};

export const state = {
  switch100,
  toggleSwitch100,
  previousVersion,
  majVersion,
  getChangeLog,
  switchCompact,
  toggleSwitchCompact,
};
