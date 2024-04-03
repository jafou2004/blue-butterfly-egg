import { el, mount, setAttr } from 'redom';

export const createToggleNode = (label, forId, checked, handleEvent) => {
  const div = el('div', { style: { width: '185px', padding: '0px 2px' } });
  div.setAttribute(
    'class',
    'fidelity-tree-filter col_2_12 col_xl_3_12 col_md_12_12 filters-panel',
  );

  const lab = el('label', label, {
    for: forId,
    style: {
      marginBottom: '5px',
      paddingLeft: '0px',
      height: '20px',
      minHeight: '20px',
    },
  });
  mount(div, lab);

  const divSwitch = el('.onoffswitch', { style: { minWidth: 'auto' } });
  mount(div, divSwitch);

  const input = el('input.onoffswitch-checkbox', {
    id: forId,
    name: forId,
    type: 'checkbox',
  });
  if (checked) {
    setAttr(input, { checked: 'checked' });
  }
  input.addEventListener('change', handleEvent);
  mount(divSwitch, input);

  const labSwitch = el('label.onoffswitch-label', {
    for: forId,
    style: { height: '30px' },
  });
  mount(divSwitch, labSwitch);

  const span = el(
    'span.onoffswitch-inner',
    el('span.onoffswitch-switch', {
      style: { height: '20px', width: '20px' },
    }),
    {
      'data-text-before': 'On',
      'data-text-after': 'Off',
      style: { height: '30px', lineHeight: '30px' },
    },
  );
  mount(labSwitch, span);

  return div;
};
