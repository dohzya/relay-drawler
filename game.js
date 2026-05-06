const state = {
  tab: 'base',
  day: 17,
  base: { components: 126, blueprints: 8, replicants: 4, efficiency: 78, hubLvl: 2 },
  modules: [
    { name: 'Foreuse', lvl: 2, status: 'actif' },
    { name: 'Imprimante', lvl: 1, status: 'actif' },
    { name: 'Relais', lvl: 1, status: 'améliorable' },
    { name: 'Reconnaissance', lvl: 1, status: 'indisponible' }
  ],
  queue: [
    { name: 'Amélioration foreuse L3', eta: '02:15' },
    { name: 'Fabrication blueprint rare', eta: '05:40' }
  ],
  operations: [
    { name: 'Extraction basaltique', risk: 'faible', reward: '+22 composants' },
    { name: 'Nettoyage relais K-17', risk: 'moyen', reward: '+1 blueprint' }
  ],
  log: ['Hub initialisé', 'Cycle passif +12 composants']
};

const tabs = [
  ['base', 'Base'],
  ['ops', 'Opérations'],
  ['exp', 'Expédition'],
  ['rep', 'Répliquants'],
  ['run', 'Partie']
];

const app = document.getElementById('app');

function render() {
  app.innerHTML = `
    <section class="card header">
      <div>
        <div class="muted">Relais Drones · Jour ${state.day}</div>
        <div class="title">Hub Oméga-${state.base.hubLvl}</div>
      </div>
      <div class="res">
        <span class="badge">Composants ${state.base.components}</span>
        <span class="badge">Blueprints ${state.base.blueprints}</span>
      </div>
    </section>

    <section class="kpi">
      <article class="card"><div class="muted">Répliquants</div><div class="big">${state.base.replicants}</div></article>
      <article class="card"><div class="muted">Rendement</div><div class="big">${state.base.efficiency}%</div></article>
      <article class="card"><div class="muted">File active</div><div class="big">${state.queue.length}</div></article>
    </section>

    ${renderMain()}

    <section class="card">
      <div class="muted">Références DA / assets fournis</div>
      <div class="asset-strip">
        <img src="specs/example-screen.jpeg" alt="Exemple interface" />
        <img src="specs/example-icons.jpeg" alt="Exemple icônes" />
        <img src="specs/example-loot-screen-with-dragndrop.png" alt="Exemple loot" />
      </div>
    </section>

    <nav class="nav">${tabs
      .map(([id, label]) => `<button class="${state.tab === id ? 'active' : ''}" data-tab="${id}">${label}</button>`)
      .join('')}</nav>
  `;

  app.querySelectorAll('[data-tab]').forEach((b) => b.addEventListener('click', () => {
    state.tab = b.dataset.tab;
    render();
  }));
  app.querySelectorAll('[data-act]').forEach((b) => b.addEventListener('click', () => action(b.dataset.act)));
}

function renderMain() {
  if (state.tab === 'base') {
    return `<section class="card grid">
      <div class="row"><strong>Modules prioritaires</strong><button class="btn" data-act="tick">Cycle +</button></div>
      <div class="modules">${state.modules.map((m) => `<div class="tile"><div>${m.name}</div><div class="muted">Niv ${m.lvl} · ${m.status}</div></div>`).join('')}</div>
      <div class="muted">Vue compacte sans scroll long (2-3 cartes + file courte) conforme à la spec mobile portrait.</div>
    </section>
    <section class="card grid">
      <strong>File d'actions</strong>
      ${state.queue.map((q) => `<div class="queue-item"><span>${q.name}</span><span class="muted">${q.eta}</span></div>`).join('')}
    </section>`;
  }
  if (state.tab === 'ops') {
    return `<section class="card grid"><strong>Opérations</strong>${state.operations.map((o) => `<div class="queue-item"><span>${o.name}<br><small class="muted">Risque ${o.risk}</small></span><span>${o.reward}</span></div>`).join('')}<button class="btn primary" data-act="launch">Lancer une opération</button></section>`;
  }
  if (state.tab === 'exp') return `<section class="card">Expédition: secteurs, relais et projets blueprint (WIP gameplay V0.2).</section>`;
  if (state.tab === 'rep') return `<section class="card">Répliquants: affectations extraction / impression / ingénierie (WIP).</section>`;
  return `<section class="card"><div class="row"><strong>Session active</strong><button class="btn" data-act="reset">Réinitialiser</button></div><div class="log">${state.log.map((l) => `<div>${l}</div>`).join('')}</div></section>`;
}

function action(act) {
  if (act === 'tick') {
    const gain = 8 + state.base.replicants;
    state.base.components += gain;
    state.base.efficiency = Math.min(99, state.base.efficiency + 1);
    state.day += 1;
    state.log.unshift(`Jour ${state.day}: +${gain} composants, rendement ${state.base.efficiency}%`);
  }
  if (act === 'launch') {
    state.base.blueprints += 1;
    state.log.unshift('Opération complétée: blueprint récupéré.');
    state.tab = 'run';
  }
  if (act === 'reset') {
    state.log = ['Session réinitialisée'];
  }
  render();
}

render();
