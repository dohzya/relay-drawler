# Architecture technique

## Objectif

Ce prototype est une application web statique, mobile first, sans build step et sans dependance externe. Il peut etre ouvert directement depuis `index.html` ou servi par un serveur HTTP local.

Le choix technique vise une V0 rapide a iterer :

- une seule page HTML ;
- une feuille CSS responsive portrait ;
- un fichier JavaScript contenant donnees, logique de jeu, et rendu ;
- une sauvegarde locale via `localStorage`.

## Structure des fichiers

```text
.
├── index.html
├── styles.css
├── game.js
└── docs
    ├── functional
    │   └── game-design.md
    └── technical
        └── architecture.md
```

## Roles des fichiers

### `index.html`

Point d'entree minimal de l'application.

Responsabilites :

- definit la langue, le viewport mobile et la couleur de theme ;
- charge `styles.css` ;
- expose le conteneur racine `#app` ;
- charge `game.js`.

### `styles.css`

Contient tout le design system V0.

Responsabilites :

- layout portrait limite a une largeur mobile confortable ;
- composants UI reutilises par le rendu JS : stats, modules, boutons, panels, jauges ;
- ergonomie tactile avec gros boutons, actions sticky en bas d'ecran et contraintes `safe-area` ;
- theme visuel sombre et lisible pour sessions courtes.

### `game.js`

Contient le coeur du prototype.

Responsabilites :

- donnees statiques : modules, ennemis, expeditions, upgrades ;
- etat courant de la base et de la run ;
- persistance ;
- tirages, relances, selection des modules ;
- simulation et application d'un cycle ;
- resolution des vagues ;
- securisation ou perte du loot ;
- rendu HTML des ecrans.

## Modele de donnees

### Donnees statiques

Les constantes principales sont :

- `MODULES` : pool de modules disponibles, incluant les parasites optionnels ;
- `ENEMIES` : ennemis et modificateurs de vague ;
- `EXPEDITIONS` : sequences de vagues et conditions de deblocage ;
- `UPGRADES` : ameliorations achetables a la base ;
- `MULTIPLIERS` : multiplicateurs de profondeur de run.

Les modules utilisent des proprietes declaratives simples, par exemple :

- `energy` ;
- `turbo` ;
- `heat` ;
- `network` ;
- `cool` ;
- `purifyScore` ;
- `lootPct` ;
- flags de combo comme `afterburn`, `adaptive`, `purge`, `stabilize`.

Le moteur lit ces proprietes dans `simulateCycle()`.

### Etat persistant

L'etat racine est initialise depuis `defaultState` :

```js
{
  screen: "base",
  components: 40,
  passiveDrones: 0,
  upgrades: [],
  toast: "",
  run: null
}
```

Il est sauvegarde sous la cle `replicator-drones-v0` dans `localStorage`.

`toast` n'est pas conserve volontairement : il sert seulement au feedback immediat de la session courante.

### Etat de run

Une run active contient notamment :

- expedition choisie ;
- index de vague ;
- cycle courant ;
- score brut accumule ;
- score reserve a la purification ;
- chaleur ;
- reseau ;
- loot non securise ;
- nombre de drones purifies pendant la run ;
- main de 5 modules ;
- indices des modules selectionnes ;
- relances restantes.

## Flux applicatif

### Base

L'ecran base est rendu par `renderBase()`.

Actions principales :

- lancer une expedition avec `startExpedition(id)` ;
- acheter une amelioration avec `buyUpgrade(id)` ;
- reinitialiser la progression avec `resetGame()`.

### Run

L'ecran de vague est rendu par `renderRun()`.

Flux d'un cycle :

1. la main contient 5 modules ;
2. le joueur selectionne jusqu'a 3 modules avec `toggleModule(index)` ;
3. il peut relancer les modules non selectionnes avec `reroll()` ;
4. le score previsionnel est calcule par `projectedScore()` ;
5. le joueur applique le cycle avec `applyCycle()`.

Au troisieme cycle, `applyCycle()` appelle `finishWave()`.

### Resultat de vague

`finishWave()` calcule :

- score final de vague ;
- score de purification ;
- succes ou echec ;
- loot gagne par la vague ;
- purification eventuelle.

L'ecran de resultat est rendu par `renderWaveResult()`.

Si la vague est reussie, le joueur peut :

- continuer avec `continueRun()` ;
- rentrer a la base avec `secureRun(false)`.

Si la derniere vague est terminee, `continueRun()` appelle `secureRun(true)`.

### Echec et abandon

En cas d'echec de vague :

- le loot non securise est perdu ;
- la production passive est ajoutee ;
- le joueur revient a la base.

En cas d'abandon volontaire pendant une vague avec `abortRun()` :

- le loot non securise est perdu ;
- la production passive est ajoutee ;
- le joueur revient a la base.

## Calculs principaux

### Cycle

`simulateCycle()` est la fonction centrale de calcul.

Elle lit les modules selectionnes et renvoie :

- energie effective du cycle ;
- chaleur finale du cycle ;
- variation de chaleur ;
- gain de reseau ;
- bonus de purification ;
- bonus de loot ;
- penalites finales ;
- flags de combo.

La chaleur active reduit l'energie effective :

```text
penalite chaleur = 1 - chaleur active * taux
```

Le taux de base est `5%` par point de chaleur. Certains ennemis peuvent l'augmenter.

### Reseau

Le multiplicateur reseau est calcule par `networkMultiplier()` :

```text
1 + reseau * 0.15 + bonus de paliers
```

Paliers V0 :

- reseau >= 3 : `+0.5` multiplicateur ;
- reseau >= 8 : `+1` multiplicateur ;
- reseau >= 5 : accorde une relance supplementaire une fois par vague.

Certains ennemis, comme le noyau relais, doublent le reseau pour le calcul.

### Score final

Le score brut est accumule cycle par cycle, puis multiplie en fin de vague :

```text
score final = score brut * multiplicateur reseau
```

Le score de purification ajoute les bonus de modules de purification :

```text
score purification = score final + bonus purification
```

## Rendu

Le rendu utilise des templates HTML generes par JavaScript et injectes dans `#app`.

Fonctions principales :

- `render()` : route vers l'ecran courant ;
- `renderBase()` ;
- `renderRun()` ;
- `renderWaveResult()` ;
- `renderModule(module, index, selected)`.

Cette approche est volontairement simple pour la V0. Si le jeu grandit, les premieres zones a extraire seront :

- moteur de jeu pur ;
- donnees de contenu ;
- composants UI ;
- couche de persistance.

## Persistance

La sauvegarde est locale au navigateur.

Fonctions :

- `loadState()` ;
- `saveState()`.

Limites :

- pas de synchronisation multi-appareil ;
- pas de migrations de schema ;
- pas d'export/import de sauvegarde.

Pour une V1, prevoir un champ `saveVersion` et une fonction de migration.

## Contraintes mobile

La V0 cible un usage portrait a une main.

Choix d'interface :

- actions principales dans `.sticky-actions` en bas d'ecran ;
- tuiles de modules en grille 2 colonnes ;
- boutons d'au moins 44 px ;
- prise en compte des safe areas iOS ;
- largeur maximale de 480 px pour garder une densite lisible.

## Lancement local

Ouverture directe :

```text
file:///Users/dohzya/Documents/New%20project/index.html
```

Serveur local :

```bash
python3 -m http.server 4173
```

Puis ouvrir :

```text
http://127.0.0.1:4173
```

Sur iPhone, utiliser l'adresse IP locale du Mac si le telephone est sur le meme reseau Wi-Fi.

## Dette technique connue

- Les donnees, la logique et le rendu sont dans un seul fichier.
- Les handlers sont appeles via attributs `onclick`.
- Les tirages utilisent `Math.random()` sans seed.
- Il n'existe pas encore de tests automatises de simulation.
- La sauvegarde n'a pas de versionnement.
- Le prototype n'a pas encore de pipeline de build, lint ou packaging PWA.

## Prochaines evolutions techniques recommandees

1. Extraire les donnees dans `data/*.js`.
2. Extraire le moteur dans `src/game-engine.js`.
3. Ajouter des tests unitaires sur `simulateCycle()`, `networkMultiplier()` et `finishWave()`.
4. Ajouter un manifeste PWA et une icone pour installation sur iPhone.
5. Introduire une migration de sauvegarde versionnee.
6. Remplacer les `onclick` inline par une delegation d'evenements centralisee.
