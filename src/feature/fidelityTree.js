import { dqs, dqsa, qs } from '../utils/dom';
import { el, mount, setStyle } from 'redom';

import { createDisplayCoinsNode } from '../create/displayCoinsNode';
import { createToggle100Node } from './fidelityTree/toggle100';
import { createToggleCompactNode } from './fidelityTree/toggleCompact';
import { rmClass } from '../utils/dom';

export const modifyFidelityTreePage = () => {
  let tree = dqs('#fidelity-tree');
  setStyle(tree, 'paddingTop', '10px');

  let header = dqs('#content .col_headering');
  setStyle(header, 'display', 'none');

  let amount = qs(
    header,
    '.credit-widget span.credit-widget-amount span',
  ).innerText;

  let swithcConversion = null;
  let filters = dqsa(
    '#content .fidelity-tree-filter, #content .fidelity-tree-switch, #tree-refresh-container',
  );
  for (let filter of filters) {
    rmClass(filter, 'mt_30');
    setStyle(filter, 'padding', '0px 5px 0px 2px');
    let label = qs(filter, 'label');
    setStyle(label, {
      marginBottom: '0px',
      paddingLeft: '0px',
      height: '20px',
      minHeight: '20px',
    });
    let width = 185;
    if (label.getAttribute('for') == 'fidelity-tree-level-filter') {
      width = 110;
    }
    if (label.getAttribute('for') == 'fidelity-tree-owner-filter') {
      width = 250;
    }
    if (label.getAttribute('for') == 'fidelity-tree-search-filter') {
      width = 150;
    }
    if (label.getAttribute('for') == 'fidelity-tree-favourite-switch') {
      width = 160;
      setStyle(qs(filter, 'label.onoffswitch-label'), 'marginTop', '5px');
    }
    if (label.innerText == 'Conversion Emrys coins') {
      width = 200;
      swithcConversion = filter;
    }
    setStyle(filter, 'width', width + 'px');
  }

  rmClass(dqs('#fidelity-tree-card-container'), 'mt_60');
  setStyle(dqs('#fidelity-tree-card-container'), 'marginTop', '10px');

  mount(tree, el('.clear'), tree.firstChild);

  if (swithcConversion !== null) {
    setStyle(swithcConversion, 'float', 'right');
    setStyle(
      qs(swithcConversion, 'label.twoStatebutton-label'),
      'height',
      '30px',
    );
    setStyle(qs(swithcConversion, 'span.twoStatebutton-inner'), {
      height: '30px',
      lineHeight: '30px',
    });
    setStyle(qs(swithcConversion, 'span.twoStatebutton-switch'), {
      height: '20px',
      width: '20px',
    });
    tree.prepend(swithcConversion);
  }

  tree.prepend(createToggleCompactNode());
  tree.prepend(createToggle100Node());
  tree.prepend(createDisplayCoinsNode(amount));

  setStyle(dqs('#fidelity-tree-paginate'), {
    paddingTop: '10px',
    marginTop: '0px',
  });
};
