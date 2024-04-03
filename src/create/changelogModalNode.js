import { el, mount, text } from 'redom';

import { state } from '../utils/storage';

export const ID_MODAL_CHANGELOG = 'id_modal_changelog';

export const createChangelogModalNode = () => {
  const divModal = el('.modal-container-microTasks', {
    class: 'iziModal',
    id: ID_MODAL_CHANGELOG,
    role: 'dialog',
    style: {
      zIndex: '999',
      borderRadius: '3px',
      maxWidth: '800px',
      height: '350px',
      overflow: 'auto',
    },
  });
  const divWrap = el('.iziModal-wrap');
  mount(divModal, divWrap);

  const divContent = el('.iziModal-content', {
    style: { padding: '0px', marginTop: '0px' },
  });
  mount(divWrap, divContent);

  const h2 = el('h2', text('BBE - Historique des versions'), {
    style: {
      borderBottom: '2px solid #9b70f0',
      marginBottom: '20px',
      paddingBottom: '15px',
      textAlign: 'center',
    },
  });
  mount(divContent, h2);

  const changes = state.getChangeLog();
  changes.forEach((change) => {
    let div = el('div', { style: { marginTop: '20px' } });
    let v = el('p', text(`Version ${change.version} - ${change.date}`), {
      style: { color: '#fff' },
    });
    mount(div, v);
    change.changes.forEach((c) => {
      mount(
        div,
        el('p', text(`- ${c}`), {
          style: { color: 'lightslategray', fontSize: '17px' },
        }),
      );
    });
    mount(divContent, div);
  });

  return divModal;
};
