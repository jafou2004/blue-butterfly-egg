import { el, mount, text } from 'redom';

export const ID_MODAL_ABOUT = 'id_modal_about';

const addFeature = (feature, parent) => {
  mount(
    parent,
    el('p', text(` - ${feature}`), {
      style: { color: '#fff', fontSize: '15px', lineHeight: '16px' },
    }),
  );
};

export const createAboutModalNode = () => {
  const divModal = el('.modal-container-microTasks', {
    class: 'iziModal',
    id: ID_MODAL_ABOUT,
    role: 'dialog',
    style: {
      zIndex: '999',
      borderRadius: '3px',
      maxWidth: '600px',
      height: '305px',
    },
  });
  const divWrap = el('.iziModal-wrap', { style: { height: 'auto' } });
  mount(divModal, divWrap);

  const divContent = el('.iziModal-content', { style: { padding: '0px' } });
  mount(divWrap, divContent);

  const h2 = el('h2', text('Blue Butterfly Egg - à propos'), {
    style: {
      borderBottom: '2px solid #9b70f0',
      marginBottom: '20px',
      paddingBottom: '15px',
      textAlign: 'center',
    },
  });
  mount(divContent, h2);

  const p1 = el(
    'p',
    text(
      "Petit plugin qui modifie l'affichage des pages pour nous rendre la vie plus simple",
    ),
    { style: { color: '#fff' } },
  );
  mount(divContent, p1);

  mount(
    divContent,
    el('p', text('Principales fonctionnalitées '), {
      style: {
        color: '#fff',
        borderBottom: '1px solid #9b70f0',
        textAlign: 'center',
      },
    }),
  );
  mount(
    divContent,
    el('p', text('Arbre de fidélité :'), {
      style: { color: '#fff', fontSize: '18px', lineHeight: '22px' },
    }),
  );
  addFeature('entête plus compact', divContent);
  addFeature('bouton pour masquer de part à 100%', divContent);
  addFeature('bouton pour affichage compact des parts', divContent);

  mount(divContent, el('div', { style: { display: 'block', height: '40px' } }));
  mount(
    divContent,
    el(
      'p',
      { style: { textAlign: 'center' } },
      text('Version : ' + APP_VERSION),
    ),
  );

  return divModal;
};
