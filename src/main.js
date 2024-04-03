import { dqs, dqsa } from './utils/dom';

import { createAboutModalNode } from './create/aboutModalNode';
import { createChangelogModalNode } from './create/changelogModalNode';
import { createMenuNode } from './create/menuNode';
import { modifyFidelityTreePage } from './feature/fidelityTree';
import { state } from './utils/storage';
import { toggle100 } from './feature/fidelityTree/toggle100';

import 'toastr/build/toastr.min.css';
import toastr from 'toastr';

// page "arbre de fidelite"
if (window.location.pathname.endsWith('/avantages/arbre-de-fidelite')) {
  modifyFidelityTreePage();
}

if (!window.location.pathname.endsWith('/fr/connexion')) {
  // Add Menu bbe
  const menu = dqs('header#main div.menu-wrapper div.menu.first-level');
  menu.append(createMenuNode());

  // Add modal
  const modals = dqsa('.modal-container-microTasks.iziModal');
  const lastModal = modals[modals.length - 1];
  lastModal.after(createAboutModalNode());
  lastModal.after(createChangelogModalNode());

  console.log(state.previousVersion());

  toastr.options = {
    progressBar: true,
    positionClass: 'toast-top-right',
    showDuration: '5000',
  };

  // first install and update
  if (state.previousVersion() === undefined) {
    toastr.success(
      "Bienvenue !<br/>N'éhistez pas à aller voir dans le nouveau menu BBE",
      'Plugin BBE installé',
    );
  } else if (state.previousVersion() != APP_VERSION) {
    console.log('Script maj done');
    toastr.success(
      'Allez dans BBE > Historique pour voir les nouveautées',
      'BBE mise à jour',
    );
  }
  state.majVersion(APP_VERSION);
}

// listen tree reloading
((open) => {
  XMLHttpRequest.prototype.open = function () {
    this.addEventListener('readystatechange', () => {
      if (
        this.responseURL ==
          'https://www.emryslacarte.fr/fr/myemrys/fidelity-tree-api' &&
        this.readyState == 4
      ) {
        setTimeout(() => {
          if (
            window.location.pathname.endsWith('/avantages/arbre-de-fidelite')
          ) {
            toggle100();
          }
        }, 10);
      }
    });
    open.apply(this, arguments);
  };
})(XMLHttpRequest.prototype.open);
