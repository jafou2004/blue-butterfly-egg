import { clearOverlayAndModal } from '../feature/modal';
import { el } from 'redom';

export const createOverlayModalNode = (modalId) => {
  const overlay = el('.iziModal-overlay', {
    class: 'fadeIn',
    style: { backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: '997' },
  });
  overlay.addEventListener('click', () => {
    clearOverlayAndModal(modalId);
  });
  return overlay;
};
