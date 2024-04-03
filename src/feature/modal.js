import { addClass } from '../utils/dom';
import { createOverlayModalNode } from '../create/overlayModalNode';
import { dqs } from '../utils/dom';
import { rmClass } from '../utils/dom';
import { setStyle } from 'redom';

export const displayOverlayAndModal = (id) => {
  const modal = dqs('#' + id);
  addClass(modal, 'transitionIn');
  addClass(modal, 'comingIn');
  setStyle(modal, 'display', 'block');

  const overlay = createOverlayModalNode(id);
  dqs('body').append(overlay);

  setTimeout(() => {
    rmClass(modal, 'transitionIn');
    rmClass(modal, 'comingIn');
    rmClass(overlay, 'fadeIn');
  }, 500);
};

export const clearOverlayAndModal = (id) => {
  const modal = dqs('#' + id);
  addClass(modal, 'comingOut');

  const overlay = dqs('.iziModal-overlay');
  addClass(overlay, 'fadeOut');

  setTimeout(() => {
    rmClass(modal, 'comingOut');
    setStyle(modal, 'display', 'none');
    overlay.remove();
  }, 500);
};
