import { createToggleNode } from '../../create/toggleNode';
import { dqsa } from '../../utils/dom';
import { setStyle } from 'redom';
import { state } from '../../utils/storage';

const handleSwitch100 = (event) => {
  state.toggleSwitch100();
  toggle100();
};

export const toggle100 = () => {
  const energys = dqsa('div.energy-div[data-tips="100%"]');
  for (let energy of energys) {
    setStyle(
      energy.closest('.fidelity-tree-card'),
      'display',
      state.switch100() ? 'none' : '',
    );
  }
};

export const createToggle100Node = () => {
  toggle100();
  return createToggleNode(
    'Masquer les 100%',
    'switch-100',
    state.switch100(),
    handleSwitch100,
  );
};
