import { dqsa, hasList, qs } from '../../utils/dom';
import { el, mount, setAttr, setStyle, text } from 'redom';

import { createToggleNode } from '../../create/toggleNode';
import { state } from '../../utils/storage';

const handleSwitchCompact = () => {
  state.toggleSwitchCompact();
  toggleCompact();
};

const createHeader = (level, id) => {
  const span = el('span.compactHeader', text('#' + level + '-' + id), {
    style: { padding: '10px 2px', fontSize: '20px', textAlign: 'left' },
  });
  return span;
};

const createGift = (classe) => {
  const div = el('div');
  setAttr(div, 'class', classe + ' fidelity-tree-card-donation received');
  setStyle(div, 'position', 'static');
  return div;
};
function createStat(nbLeft, nbRight) {
  const maxLeft = Math.min(6, nbLeft);
  const maxRight = Math.min(6, nbRight);
  const pourcent = (maxLeft + maxRight) * 10;
  return el('p.stat', text(`${pourcent}% - ${maxLeft} / ${maxRight}`), {
    style: { paddingTop: '4px', paddingLeft: '2px' },
  });
}

function createCardOwner(card) {
  const p = el('p.owner');
  const spanOwner = el('span', text(card.getAttribute('data-owner')), {
    'data-name': 'partOwner',
  });
  mount(p, spanOwner);
  const spanUid = el('span', text(card.getAttribute('data-ownerUid')), {
    'data-name': 'partOwnerUid',
  });
  mount(p, spanUid);
  //   card.removeAttribute('data-ownerUid');
  return p;
}

export const toggleCompact = () => {
  const cards = dqsa('.fidelity-tree-card');
  for (let card of cards) {
    const pieceLevel = card.getAttribute('data-level');
    const pieceId = card.getAttribute('data-id');

    card.style.width = state.switchCompact() ? '240px' : '';

    // Card -> Donation fidelity-tree-card-donation
    const donation = qs(card, '.fidelity-tree-card-donation');
    setStyle(donation, { display: state.switchCompact() ? 'none' : '' });

    // Card -> Header
    const header = qs(card, '.fidelity-tree-card-header');
    setStyle(header, {
      padding: state.switchCompact() ? '0px 0px' : '24px 12px',
    });

    // Header -> Label
    const label = qs(header, '.fidelity-tree-card-label');
    setStyle(label, { display: state.switchCompact() ? 'none' : '' });
    if (state.switchCompact()) {
      header.prepend(createHeader(pieceLevel, pieceId));
    } else {
      if (qs(header, '.compactHeader')) {
        qs(header, '.compactHeader').remove();
      }
    }

    // Header -> Favourite
    const favourite = qs(header, '.fidelity-tree-card-add-favourite');
    setStyle(favourite, {
      right: state.switchCompact() ? '5px' : '',
      top: state.switchCompact() ? '5px' : '',
    });

    // Header -> Bonus fidelity-tree-card-bonus
    const bonus = qs(header, '.fidelity-tree-card-bonus');
    setStyle(bonus, { display: state.switchCompact() ? 'none' : '' });
    const nbPiecesLeft = bonus.getAttribute('data-calc-left');
    const nbPiecesRight = bonus.getAttribute('data-calc-right');

    // Header -> info
    const info = qs(header, '.fidelity-tree-card-info');
    setStyle(info, {
      borderBottom: state.switchCompact() ? 'none' : '',
      height: state.switchCompact() ? '45px' : '',
      marginTop: state.switchCompact() ? '0px' : '',
      paddingBottom: state.switchCompact() ? '0px' : '',
    });
    if (state.switchCompact()) {
      setAttr(
        card,
        'data-ownerUid',
        qs(info, 'span[data-name="partOwnerUid"]').innerHTML,
      );

      qs(info, 'p.owner').remove();
      if (hasList(donation, 'received')) {
        info.prepend(createGift('gift'));
      }
      info.prepend(createStat(nbPiecesLeft, nbPiecesRight));
    } else {
      if (!qs(info, 'p.owner')) {
        info.prepend(createCardOwner(card));
      }
      if (qs(info, '.gift')) {
        qs(info, '.gift').remove();
      }
      if (qs(info, 'p.stat')) {
        qs(info, 'p.stat').remove();
      }
    }

    // Card -> Content (add piece button)
    const content = qs(card, '.fidelity-tree-card-content');
    setStyle(content, {
      height: state.switchCompact() ? '22px' : '',
      padding: state.switchCompact() ? '2px 0px' : '',
    });
    const a = qs(content, 'a');
    setStyle(a, { padding: state.switchCompact() ? '0px 5px' : '' });
    const img = qs(content, 'img');
    setStyle(img, {
      height: state.switchCompact() ? '18px' : '',
      margin: state.switchCompact() ? '0px 0px 0px 5px' : '',
    });
  }
};

export const createToggleCompactNode = () => {
  toggleCompact();
  return createToggleNode(
    'Affichage compact',
    'switch-compact',
    state.switchCompact(),
    handleSwitchCompact,
  );
};
