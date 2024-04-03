import { el, mount, text } from 'redom';

export const createDisplayCoinsNode = (amount) => {
  let div = el('div', { style: { width: '185px', padding: '0px 2px' } });
  div.setAttribute(
    'class',
    'fidelity-tree-filter col_2_12 col_xl_3_12 col_md_12_12 filters-panel',
  );

  let lab = el('label', text('Mes Emrys coins'), {
    style: {
      marginBottom: '0px',
      paddingLeft: '0px',
      height: '20px',
      minHeight: '20px',
    },
  });
  mount(div, lab);

  let divAmount = el('div', text(amount), {
    style: {
      marginLeft: '-50px',
      paddingTop: '2px',
      color: '#00e0ea',
      fontSize: '25px',
      fontWeight: '700',
    },
  });
  mount(div, divAmount);

  let img = el('img.emrys-coin', {
    style: { width: '22px', paddingLeft: '4px' },
    src: '/assets/images/user/emrys_coin.png',
    alt: 'Coin',
  });
  mount(divAmount, img);

  return div;
};
