const STORAGE_KEY = "relay-drawler-save";

const MODULES = [
  { id: "weak_cell", name: "Cellule faible", icon: "+8", tags: ["energie"], effect: "+8 energie.", energy: 8 },
  { id: "cell", name: "Cellule standard", icon: "+12", tags: ["energie"], effect: "+12 energie.", energy: 12 },
  { id: "high_cell", name: "Cellule haute capacite", icon: "+18", tags: ["energie"], effect: "+18 energie.", energy: 18 },
  { id: "unstable_battery", name: "Batterie instable", icon: "+25", tags: ["energie", "turbo"], effect: "+25 energie, +1 chaleur.", energy: 25, heat: 1 },
  { id: "light_boost", name: "Accelerateur leger", icon: "x1.4", tags: ["turbo"], effect: "x1,4 energie, +1 chaleur.", turbo: 1.4, heat: 1 },
  { id: "plasma_boost", name: "Accelerateur plasma", icon: "x1.8", tags: ["turbo"], effect: "x1,8 energie, +2 chaleur.", turbo: 1.8, heat: 2 },
  { id: "core_overload", name: "Surcharge de coeur", icon: "x2.5", tags: ["turbo"], effect: "x2,5 energie, +4 chaleur.", turbo: 2.5, heat: 4 },
  { id: "afterburn", name: "Postcombustion", icon: "x1.3", tags: ["turbo"], effect: "x1,3. Si +2 chaleur ce cycle, +15 energie.", turbo: 1.3, afterburn: true },
  { id: "network_node", name: "Noeud reseau", icon: "+1", tags: ["reseau"], effect: "+1 reseau.", network: 1 },
  { id: "optic_relay", name: "Relais optique", icon: "+2", tags: ["reseau"], effect: "+2 reseau avant le dernier cycle, sinon +1.", opticRelay: true },
  { id: "adaptive_route", name: "Routage adaptatif", icon: "+R", tags: ["reseau"], effect: "+1 reseau. Si reseau >= 3, +10 energie.", network: 1, adaptive: true },
  { id: "distributed_sync", name: "Synchro distribuee", icon: "25%", tags: ["reseau"], effect: "Au prochain cycle, energies +25%.", sync: true },
  { id: "passive_radiator", name: "Radiateur passif", icon: "-2", tags: ["refroidissement"], effect: "-2 chaleur.", cool: 2 },
  { id: "thermal_purge", name: "Purge thermique", icon: "0H", tags: ["refroidissement"], effect: "Retire la chaleur, energie du cycle -20%.", purge: true },
  { id: "kinetic_sink", name: "Dissipateur cinetique", icon: "-1", tags: ["refroidissement"], effect: "-1 chaleur. Si chaleur >= 3, +15 energie.", cool: 1, kinetic: true },
  { id: "signal_stabilizer", name: "Stabilisateur", icon: "OK", tags: ["stabilite"], effect: "Ignore la penalite de chaleur ce cycle.", stabilize: true },
  { id: "reconnect_signal", name: "Signal reconnexion", icon: "+20", tags: ["purification"], effect: "+20 score seulement pour purification.", purifyScore: 20 },
  { id: "repair_packet", name: "Paquet reparation", icon: "+10", tags: ["purification", "stabilite"], effect: "+10 purification et -1 chaleur.", purifyScore: 10, cool: 1 },
  { id: "component_extractor", name: "Extracteur comp.", icon: "+10%", tags: ["loot"], effect: "Si reussite, +10% loot de vague.", lootPct: 0.1 },
  { id: "core_analysis", name: "Analyse noyau", icon: "+R", tags: ["reseau", "loot"], effect: "+1 reseau. Si purification, bonus composants.", network: 1, coreAnalysis: true },
  { id: "heat_parasite", name: "Parasite thermique", icon: "+H", tags: ["parasite"], effect: "+1 chaleur si garde.", heat: 1, parasite: true },
  { id: "signal_noise", name: "Bruit de signal", icon: "-10", tags: ["parasite"], effect: "-10 score final.", finalPenalty: 10, parasite: true },
];

const MODULE_BY_ID = Object.fromEntries(MODULES.map((module) => [module.id, module]));
const BASE_POOL = MODULES.filter((module) => !module.parasite).map((module) => module.id);

const ENEMIES = {
  stray: {
    name: "Drone errant",
    neutral: 60,
    purify: 90,
    baseLoot: 20,
    effect: "Aucun effet.",
  },
  collector: {
    name: "Collecteur corrompu",
    neutral: 80,
    purify: 120,
    baseLoot: 25,
    effect: "+20% loot si purifie.",
    purifiedLootPct: 0.2,
  },
  turret: {
    name: "Tourelle autonome",
    neutral: 110,
    purify: 150,
    baseLoot: 35,
    effect: "La chaleur penalise 10% de plus.",
    heatPenaltyBonus: 0.1,
  },
  swarm: {
    name: "Essaim parasite",
    neutral: 90,
    purify: 140,
    baseLoot: 30,
    effect: "Ajoute un parasite thermique dans les tirages.",
    parasite: "heat_parasite",
  },
  relayCore: {
    name: "Noyau relais",
    neutral: 140,
    purify: 210,
    baseLoot: 50,
    effect: "Le reseau compte double. La chaleur reste entiere.",
    doubleNetwork: true,
    keepAllHeat: true,
  },
  weakRelayCore: {
    name: "Noyau relais affaibli",
    neutral: 120,
    purify: 180,
    baseLoot: 45,
    effect: "Le reseau compte double.",
    doubleNetwork: true,
  },
};

const EXPEDITIONS = [
  {
    id: "orbital_dump",
    name: "Decharge orbitale",
    difficulty: "Facile",
    waves: ["stray", "collector", "turret"],
    reward: "Composants standards",
  },
  {
    id: "relay_k17",
    name: "Relais K-17",
    difficulty: "Moyenne",
    waves: ["collector", "swarm", "relayCore"],
    reward: "Composants + donnees corrompues",
  },
  {
    id: "greenhouse",
    name: "Serre mecanique infectee",
    difficulty: "Moyenne",
    waves: ["stray", "swarm", "collector", "weakRelayCore"],
    reward: "Meilleurs gains de purification",
    lockedBy: "sector_scan",
  },
];

const UPGRADES = [
  { id: "reinforced_cells", name: "Cellules renforcees", cost: 50, effect: "Toutes les cellules donnent +2 energie." },
  { id: "calibrated_turbo", name: "Turbo calibre", cost: 80, effect: "Les turbos generent -1 chaleur, minimum 1." },
  { id: "fast_network", name: "Reseau accelere", cost: 80, effect: "Commence chaque vague avec +1 reseau." },
  { id: "better_radiators", name: "Radiateurs ameliores", cost: 60, effect: "Le refroidissement retire +1 chaleur." },
  { id: "assisted_reconnect", name: "Reconnexion assistee", cost: 100, effect: "Seuils de purification reduits de 10%." },
  { id: "recovery_workshop", name: "Atelier de recuperation", cost: 50, effect: "+10% loot quand tu rentres volontairement." },
  { id: "drone_bay", name: "Baie de drones", cost: 100, effect: "+2 capacite max de drones passifs." },
  { id: "sorting_chain", name: "Chaine de tri", cost: 120, effect: "Production passive +2 composants par drone." },
  { id: "sector_scan", name: "Scan de secteur", cost: 150, effect: "Debloque la serre mecanique infectee." },
  { id: "tactical_memory", name: "Memoire tactique", cost: 150, effect: "+1 relance par vague." },
];

const MULTIPLIERS = [1, 2, 4, 8];

const defaultState = {
  screen: "base",
  theme: "dark",
  components: 40,
  passiveDrones: 0,
  upgrades: [],
  toast: "",
  run: null,
};

let state = loadState();

applyTheme();

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return stored ? { ...structuredClone(defaultState), ...stored, toast: "" } : structuredClone(defaultState);
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, toast: "" }));
}

function applyTheme() {
  const theme = state.theme === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = theme;
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) {
    themeMeta.setAttribute("content", theme === "light" ? "#e9f3f7" : "#081014");
  }
}

function toggleTheme() {
  state.theme = state.theme === "light" ? "dark" : "light";
  applyTheme();
  state.toast = `Mode ${state.theme === "light" ? "clair" : "sombre"} active.`;
  saveState();
  render();
}

function hasUpgrade(id) {
  return state.upgrades.includes(id);
}

function passiveCap() {
  return 5 + (hasUpgrade("drone_bay") ? 2 : 0);
}

function passivePerDrone() {
  return 5 + (hasUpgrade("sorting_chain") ? 2 : 0);
}

function passiveIncome() {
  return state.passiveDrones * passivePerDrone();
}

function randItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function rollModules(run) {
  const enemy = currentEnemy(run);
  const pool = [...BASE_POOL];
  if (enemy.parasite) pool.push(enemy.parasite);
  if (run.noiseDebt > 0) pool.push("signal_noise");
  return Array.from({ length: 5 }, () => randItem(pool));
}

function currentEnemy(run = state.run) {
  return ENEMIES[run.expedition.waves[run.waveIndex]];
}

function currentPurifyThreshold(enemy = currentEnemy()) {
  return Math.ceil(enemy.purify * (hasUpgrade("assisted_reconnect") ? 0.9 : 1));
}

function startExpedition(id) {
  const expedition = EXPEDITIONS.find((item) => item.id === id);
  if (!expedition || isLocked(expedition)) return;
  state.run = {
    expedition,
    waveIndex: 0,
    cycle: 1,
    score: 0,
    purifyScore: 0,
    heat: 0,
    network: hasUpgrade("fast_network") ? 1 : 0,
    pendingSync: false,
    loot: 0,
    purifiedThisRun: 0,
    rerollsLeft: 1 + (hasUpgrade("tactical_memory") ? 1 : 0),
    selected: [],
    hand: [],
    rolled: false,
    noiseDebt: 0,
  };
  state.run.hand = rollModules(state.run);
  state.screen = "run";
  state.toast = `${expedition.name} lancee.`;
  saveState();
  render();
}

function isLocked(expedition) {
  return expedition.lockedBy && !hasUpgrade(expedition.lockedBy);
}

function toggleModule(index) {
  const selected = state.run.selected;
  if (selected.includes(index)) {
    state.run.selected = selected.filter((item) => item !== index);
  } else if (selected.length < 3) {
    selected.push(index);
  } else {
    state.toast = "Maximum 3 modules gardes.";
  }
  saveState();
  render();
}

function reroll() {
  const run = state.run;
  if (run.rerollsLeft <= 0) return;
  run.hand = run.hand.map((id, index) => (run.selected.includes(index) ? id : rollModules(run)[0]));
  run.rerollsLeft -= 1;
  run.rolled = true;
  state.toast = "Modules non gardes relances.";
  saveState();
  render();
}

function selectedModules() {
  return state.run.selected.map((index) => MODULE_BY_ID[state.run.hand[index]]);
}

function simulateCycle(run = state.run, modules = selectedModules()) {
  const enemy = currentEnemy(run);
  const activeHeat = run.heat;
  let energy = 0;
  let turbo = 1;
  let generatedHeat = 0;
  let cooling = 0;
  let networkGain = 0;
  let purifyScore = 0;
  let lootPct = 0;
  let finalPenalty = 0;
  let purge = false;
  let stabilize = false;
  let pendingSync = run.pendingSync;
  let coreAnalysis = false;

  modules.forEach((module) => {
    let moduleEnergy = module.energy || 0;
    if (module.tags.includes("energie") && hasUpgrade("reinforced_cells")) moduleEnergy += 2;
    if (run.pendingSync && module.tags.includes("energie")) moduleEnergy *= 1.25;
    energy += moduleEnergy;
    if (module.turbo) turbo *= module.turbo;
    if (module.heat) generatedHeat += module.heat;
    if (module.cool) cooling += module.cool;
    if (module.network) networkGain += module.network;
    if (module.opticRelay) networkGain += run.cycle < 3 ? 2 : 1;
    if (module.adaptive && run.network >= 3) energy += 10;
    if (module.kinetic && activeHeat >= 3) energy += 15;
    if (module.sync) pendingSync = true;
    if (module.purge) purge = true;
    if (module.stabilize) stabilize = true;
    if (module.purifyScore) purifyScore += module.purifyScore;
    if (module.lootPct) lootPct += module.lootPct;
    if (module.finalPenalty) finalPenalty += module.finalPenalty;
    if (module.coreAnalysis) coreAnalysis = true;
  });

  if (modules.some((module) => module.afterburn) && generatedHeat >= 2) energy += 15;
  if (hasUpgrade("calibrated_turbo") && generatedHeat > 0 && modules.some((module) => module.tags.includes("turbo"))) {
    generatedHeat = Math.max(1, generatedHeat - 1);
  }
  if (hasUpgrade("better_radiators") && cooling > 0) cooling += 1;

  const heatPenaltyRate = 0.05 + (enemy.heatPenaltyBonus || 0);
  const heatPenalty = stabilize ? 1 : Math.max(0.25, 1 - activeHeat * heatPenaltyRate);
  let effective = energy * turbo * heatPenalty;
  if (purge) effective *= 0.8;
  const newHeat = purge ? generatedHeat : Math.max(0, activeHeat - cooling) + generatedHeat;

  return {
    energy: Math.round(effective),
    rawEnergy: Math.round(energy),
    turbo,
    heatDelta: newHeat - activeHeat,
    heat: newHeat,
    networkGain,
    purifyScore,
    lootPct,
    finalPenalty,
    pendingSync,
    coreAnalysis,
  };
}

function networkMultiplier(run = state.run) {
  const network = currentEnemy(run).doubleNetwork ? run.network * 2 : run.network;
  let multiplier = 1 + network * 0.15;
  if (network >= 3) multiplier += 0.5;
  if (network >= 8) multiplier += 1;
  return multiplier;
}

function projectedScore(run = state.run) {
  const sim = simulateCycle();
  const networkAfter = run.network + sim.networkGain;
  const network = currentEnemy(run).doubleNetwork ? networkAfter * 2 : networkAfter;
  let multiplier = 1 + network * 0.15;
  if (network >= 3) multiplier += 0.5;
  if (network >= 8) multiplier += 1;
  const base = (run.score + sim.energy - sim.finalPenalty) * multiplier;
  return Math.max(0, Math.round(base));
}

function applyCycle() {
  const run = state.run;
  if (run.selected.length === 0) {
    state.toast = "Garde au moins un module avant de valider.";
    render();
    return;
  }
  const sim = simulateCycle();
  run.score = Math.max(0, run.score + sim.energy - sim.finalPenalty);
  run.purifyScore += sim.purifyScore;
  run.heat = sim.heat;
  run.network += sim.networkGain;
  run.pendingSync = sim.pendingSync && !state.run.pendingSync;
  run.lootBoost = (run.lootBoost || 0) + sim.lootPct;
  run.coreAnalysis = run.coreAnalysis || sim.coreAnalysis;

  if (run.network >= 5 && !run.networkRerollGranted) {
    run.rerollsLeft += 1;
    run.networkRerollGranted = true;
    state.toast = "Palier reseau 5 atteint : +1 relance.";
  } else {
    state.toast = `Cycle ${run.cycle} applique.`;
  }

  if (run.cycle >= 3) {
    finishWave();
  } else {
    run.cycle += 1;
    run.selected = [];
    run.hand = rollModules(run);
    run.rolled = false;
  }
  saveState();
  render();
}

function finalWaveScore(run = state.run) {
  return Math.max(0, Math.round(run.score * networkMultiplier(run)));
}

function finishWave() {
  const run = state.run;
  const enemy = currentEnemy(run);
  const score = finalWaveScore(run);
  const purifyScore = score + run.purifyScore;
  const neutralized = score >= enemy.neutral;
  const purified = purifyScore >= currentPurifyThreshold(enemy);
  run.lastResult = { score, purifyScore, neutralized, purified, enemyName: enemy.name };
  state.screen = "waveResult";

  if (!neutralized) {
    const passive = passiveIncome();
    state.components += passive;
    state.toast = passive > 0 ? `Echec. Production passive : +${passive}.` : "Echec de vague. Loot non securise perdu.";
    return;
  }

  let waveLoot = enemy.baseLoot * (1 + (run.lootBoost || 0));
  if (purified && enemy.purifiedLootPct) waveLoot *= 1 + enemy.purifiedLootPct;
  if (purified && run.coreAnalysis) waveLoot += 15;
  run.loot += Math.round(waveLoot);
  if (purified) run.purifiedThisRun += 1;
}

function continueRun() {
  const run = state.run;
  const completedEnemy = currentEnemy(run);
  run.waveIndex += 1;
  if (run.waveIndex >= run.expedition.waves.length) {
    secureRun(true);
    return;
  }
  const carryHeat = completedEnemy.keepAllHeat ? run.heat : Math.floor(run.heat / 2);
  run.cycle = 1;
  run.score = 0;
  run.purifyScore = 0;
  run.heat = carryHeat;
  run.network = hasUpgrade("fast_network") ? 1 : 0;
  run.pendingSync = false;
  run.selected = [];
  run.hand = rollModules(run);
  run.rolled = false;
  run.rerollsLeft = 1 + (hasUpgrade("tactical_memory") ? 1 : 0);
  run.lootBoost = 0;
  run.coreAnalysis = false;
  run.networkRerollGranted = false;
  run.lastResult = null;
  state.screen = "run";
  state.toast = `Vague ${run.waveIndex + 1}. Chaleur conservee : ${carryHeat}.`;
  saveState();
  render();
}

function secureRun(completed = false) {
  const run = state.run;
  const multiplier = MULTIPLIERS[Math.min(run.waveIndex, MULTIPLIERS.length - 1)];
  const workshop = !completed && hasUpgrade("recovery_workshop") ? 1.1 : 1;
  const gained = Math.round(run.loot * multiplier * workshop);
  const passive = passiveIncome();
  const dronesGained = Math.min(passiveCap() - state.passiveDrones, run.purifiedThisRun);
  state.components += gained + passive;
  state.passiveDrones += Math.max(0, dronesGained);
  state.toast = `${completed ? "Expedition terminee" : "Retour base"} : +${gained} composants, +${passive} passifs.`;
  state.run = null;
  state.screen = "base";
  saveState();
  render();
}

function abandonFailedRun() {
  state.run = null;
  state.screen = "base";
  saveState();
  render();
}

function abortRun() {
  const passive = passiveIncome();
  state.components += passive;
  state.toast = passive > 0 ? `Run abandonnee. Production passive : +${passive}.` : "Run abandonnee. Loot non securise perdu.";
  state.run = null;
  state.screen = "base";
  saveState();
  render();
}

function buyUpgrade(id) {
  const upgrade = UPGRADES.find((item) => item.id === id);
  if (!upgrade || hasUpgrade(id) || state.components < upgrade.cost) return;
  state.components -= upgrade.cost;
  state.upgrades.push(id);
  state.toast = `${upgrade.name} installe.`;
  saveState();
  render();
}

function resetGame() {
  if (!confirm("Reinitialiser la base et la progression ?")) return;
  state = structuredClone(defaultState);
  saveState();
  render();
}

function fmt(value) {
  return Number.isInteger(value) ? value : value.toFixed(1);
}

function render() {
  const app = document.querySelector("#app");
  applyTheme();
  if (state.screen === "run") app.innerHTML = renderRun();
  if (state.screen === "waveResult") app.innerHTML = renderWaveResult();
  if (state.screen === "base") app.innerHTML = renderBase();
}

function renderBase() {
  const unlockedExpeditions = EXPEDITIONS.map((expedition) => {
    const locked = isLocked(expedition);
    const waves = expedition.waves.map((id) => ENEMIES[id].name).join(" / ");
    return `
      <button class="choice-button" ${locked ? "disabled" : ""} onclick="startExpedition('${expedition.id}')">
        <span class="choice-head">
          <strong>${expedition.name}</strong>
          <span class="pill ${locked ? "hot" : "good"}">${locked ? "Verrouille" : expedition.difficulty}</span>
        </span>
        <span class="tiny">${waves}</span>
        <span class="pill-row">
          <span class="pill">${expedition.reward}</span>
          <span class="pill">x1 / x2 / x4</span>
        </span>
      </button>
    `;
  }).join("");

  const upgrades = UPGRADES.map((upgrade) => {
    const owned = hasUpgrade(upgrade.id);
    const affordable = state.components >= upgrade.cost;
    return `
      <button class="upgrade" ${owned || !affordable ? "disabled" : ""} onclick="buyUpgrade('${upgrade.id}')">
        <span class="upgrade-head">
          <strong>${upgrade.name}</strong>
          <span class="pill ${owned ? "good" : affordable ? "" : "hot"}">${owned ? "Actif" : `${upgrade.cost} comp.`}</span>
        </span>
        <span class="tiny">${upgrade.effect}</span>
      </button>
    `;
  }).join("");

  return `
    <section class="screen">
      <div class="topbar">
        <div>
          <p class="eyebrow">Base autonome</p>
          <h1>Relais Drones</h1>
        </div>
        <div class="button-row">
          <button class="icon-button" aria-label="Basculer le theme" title="Basculer le theme" onclick="toggleTheme()">${state.theme === "light" ? "☀" : "☾"}</button>
          <button class="icon-button" aria-label="Reinitialiser" title="Reinitialiser" onclick="resetGame()">↺</button>
        </div>
      </div>
      ${state.toast ? `<div class="toast">${state.toast}</div>` : ""}
      <div class="stat-grid">
        <div class="stat"><span class="tiny">Composants</span><b>${state.components}</b></div>
        <div class="stat"><span class="tiny">Drones</span><b>${state.passiveDrones}/${passiveCap()}</b></div>
        <div class="stat"><span class="tiny">Prod/run</span><b>+${passiveIncome()}</b></div>
      </div>
      <div class="section">
        <h2>Expeditions</h2>
        <div class="list">${unlockedExpeditions}</div>
      </div>
      <div class="section">
        <h2>Ameliorations</h2>
        <div class="list">${upgrades}</div>
      </div>
    </section>
  `;
}

function renderRun() {
  const run = state.run;
  const enemy = currentEnemy(run);
  const score = finalWaveScore(run);
  const purifyScore = score + run.purifyScore;
  const projection = projectedScore(run);
  const purifyThreshold = currentPurifyThreshold(enemy);
  const sim = simulateCycle();
  const neutralPct = Math.min(100, (score / enemy.neutral) * 100);
  const purifyPct = Math.min(100, (purifyScore / purifyThreshold) * 100);
  const modules = run.hand.map((id, index) => renderModule(MODULE_BY_ID[id], index, run.selected.includes(index))).join("");

  return `
    <section class="screen">
      <div class="topbar">
        <div>
          <p class="eyebrow">${run.expedition.name} · vague ${run.waveIndex + 1}/${run.expedition.waves.length}</p>
          <h2>${enemy.name}</h2>
          <p class="tiny">${enemy.effect}</p>
        </div>
        <div class="button-row">
          <button class="icon-button" aria-label="Basculer le theme" title="Basculer le theme" onclick="toggleTheme()">${state.theme === "light" ? "☀" : "☾"}</button>
          <button class="icon-button" aria-label="Abandonner" title="Abandonner" onclick="abortRun()">⌂</button>
        </div>
      </div>
      ${state.toast ? `<div class="toast">${state.toast}</div>` : ""}
      <div class="run-panel enemy-card">
        <div class="thresholds">
          <div>
            <div class="tiny">Neutralisation ${score}/${enemy.neutral}</div>
            <div class="meter"><span style="width:${neutralPct}%"></span></div>
          </div>
          <div>
            <div class="tiny">Purification ${purifyScore}/${purifyThreshold}</div>
            <div class="meter"><span style="width:${purifyPct}%"></span></div>
          </div>
        </div>
        <div class="forecast">
          <div class="stat"><span class="tiny">Projet.</span><b>${projection}</b></div>
          <div class="stat"><span class="tiny">Chaleur</span><b>${run.heat}</b></div>
          <div class="stat"><span class="tiny">Reseau</span><b>${run.network}</b></div>
          <div class="stat"><span class="tiny">Loot</span><b>${run.loot}</b></div>
        </div>
        <div class="cycle-strip">
          ${[1, 2, 3].map((cycle) => `<div class="cycle-dot ${cycle === run.cycle ? "active" : ""}">Cycle ${cycle}</div>`).join("")}
        </div>
        <div class="pill-row">
          <span class="pill good">Energie cycle +${sim.energy}</span>
          <span class="pill hot">Chaleur ${sim.heatDelta >= 0 ? "+" : ""}${sim.heatDelta}</span>
          <span class="pill net">Reseau +${sim.networkGain}</span>
          <span class="pill">Relances ${run.rerollsLeft}</span>
        </div>
      </div>
      <div class="module-grid">${modules}</div>
      <div class="sticky-actions">
        <div class="action-row">
          <button class="secondary" ${run.rerollsLeft <= 0 ? "disabled" : ""} onclick="reroll()">Relancer</button>
          <button class="primary" onclick="applyCycle()">Valider cycle</button>
        </div>
      </div>
    </section>
  `;
}

function renderModule(module, index, selected) {
  return `
    <button class="module-card ${selected ? "selected" : ""}" onclick="toggleModule(${index})">
      <span class="module-top">
        <span class="module-icon">${module.icon}</span>
        <span class="pill">${selected ? "Garde" : "Libre"}</span>
      </span>
      <span class="module-name">${module.name}</span>
      <span class="module-effect">${module.effect}</span>
      <span class="module-tags">
        ${module.tags.map((tag) => `<span class="tag ${tag}">${tag}</span>`).join("")}
      </span>
    </button>
  `;
}

function renderWaveResult() {
  const run = state.run;
  const result = run.lastResult;
  const multiplier = MULTIPLIERS[Math.min(run.waveIndex, MULTIPLIERS.length - 1)];
  const nextMultiplier = MULTIPLIERS[Math.min(run.waveIndex + 1, MULTIPLIERS.length - 1)];

  if (!result.neutralized) {
    return `
      <section class="screen">
        <div class="result-panel section">
          <p class="eyebrow">Signal perdu</p>
          <h1>Vague echouee</h1>
          <p class="muted">${result.enemyName} resiste. Score final : ${result.score}.</p>
          <div class="stat-grid">
            <div class="stat"><span class="tiny">Loot perdu</span><b>${run.loot}</b></div>
            <div class="stat"><span class="tiny">Prod. passive</span><b>+${passiveIncome()}</b></div>
            <div class="stat"><span class="tiny">Chaleur</span><b>${run.heat}</b></div>
          </div>
        </div>
        <div class="sticky-actions">
          <button class="primary" onclick="abandonFailedRun()">Retour base</button>
        </div>
      </section>
    `;
  }

  const finalWave = run.waveIndex >= run.expedition.waves.length - 1;
  return `
    <section class="screen">
      <div class="result-panel section">
        <p class="eyebrow">${result.purified ? "Drone reconnecte" : "Vague neutralisee"}</p>
        <h1>${result.purified ? "Purification" : "Reussite"}</h1>
        <p class="muted">${result.enemyName} · score ${result.score} · purification ${result.purifyScore}.</p>
        <div class="stat-grid">
          <div class="stat"><span class="tiny">Loot run</span><b>${run.loot}</b></div>
          <div class="stat"><span class="tiny">Multi actuel</span><b>x${multiplier}</b></div>
          <div class="stat"><span class="tiny">Drones +</span><b>${Math.min(passiveCap() - state.passiveDrones, run.purifiedThisRun)}</b></div>
        </div>
        ${result.purified ? `<div class="toast">+1 drone passif potentiel. Production future : +${passivePerDrone()} composants par run.</div>` : ""}
      </div>
      <div class="sticky-actions">
        ${finalWave ? `
          <button class="primary" onclick="continueRun()">Terminer expedition · x${multiplier}</button>
        ` : `
          <button class="primary" onclick="continueRun()">Continuer · potentiel x${nextMultiplier}</button>
          <button class="secondary" onclick="secureRun(false)">Rentrer · securiser x${multiplier}</button>
        `}
      </div>
    </section>
  `;
}

render();
