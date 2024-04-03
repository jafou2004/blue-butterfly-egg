import { el, mount, text } from 'redom';

import { ID_MODAL_ABOUT } from './aboutModalNode';
import { ID_MODAL_CHANGELOG } from './changelogModalNode';
import { addClass } from '../utils/dom';
import { displayOverlayAndModal } from '../feature/modal';
import { rmClass } from '../utils/dom';

const addListenerActive = (nodeListning, elemToActivate) => {
  nodeListning.addEventListener('mouseenter', () => {
    elemToActivate.forEach((element) => {
      addClass(element, 'active');
    });
  });
  nodeListning.addEventListener('mouseleave', () => {
    elemToActivate.forEach((element) => {
      rmClass(element, 'active');
    });
  });
};

const addLevel2 = (title, idModal, parent) => {
  const titleNode = el('a.title', el('span', text(title)), { href: '#' });
  titleNode.addEventListener('click', () => {
    displayOverlayAndModal(idModal);
  });
  mount(parent, el('.item', titleNode));
  addListenerActive(titleNode, [titleNode]);
};

export const createMenuNode = () => {
  // Level 1
  const title = el('.title', el('span', text('BBE')));
  const item = el('.item', title);
  const level2 = el(
    '.second-level',
    el('.level-title', el('span', text('BBE'))),
    { class: 'computed' },
  );
  mount(item, level2);
  addListenerActive(item, [title, level2]);

  // Level 2
  addLevel2('A propos', ID_MODAL_ABOUT, level2);
  addLevel2('Historique', ID_MODAL_CHANGELOG, level2);

  return item;
};
