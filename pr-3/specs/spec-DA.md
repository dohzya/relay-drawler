# Spec DA — Jeu mobile SF d’aventure & gestion avec robots réplicateurs

Version : 0.1
Cible : mobile portrait, iPhone 16 en priorité
Usage : référence de direction artistique pour illustrations, UI et intégration

---

## 1. Intention générale

Le jeu doit évoquer une **aventure SF calme, élégante et accessible**, centrée sur des robots réplicateurs explorant et construisant dans un environnement alien ou post-humain.

La direction artistique doit éviter l’imagerie trop geek, militarisée ou “dashboard néon”. Le rendu recherché est plutôt :

> **SF premium, sobre, tactile, grand public — quelque part entre une série Apple TV+, un objet industriel haut de gamme et une interface scientifique élégante.**

L’univers doit suggérer :

- l’exploration ;
- l’autonomie des machines ;
- la construction progressive ;
- une forme de mystère ;
- une SF non agressive, non cyberpunk, non dystopique ;
- une technologie avancée mais lisible.

Le jeu peut être stratégique, mais son apparence ne doit pas paraitre froide, punitive ou intimidante. L’expérience visuelle doit rester confortable, notamment pour une session courte à 3 h du matin.

---

## 2. Piliers visuels

### 2.1 Sobre, pas pauvre

L’interface doit être épurée, mais pas vide. Les surfaces, cartes et boutons peuvent avoir des détails subtils : bordures fines, micro-ombres, reliefs discrets, légers reflets, motifs techniques très faibles.

À éviter :

- gros néons cyan ;
- halos bleus partout ;
- effets “HUD de vaisseau gamer” ;
- surcharge d’icônes techniques ;
- boutons criards ;
- gradients trop saturés ;
- esthétique crypto-dashboard / SaaS futuriste cheap.

À viser :

- céramique ;
- titane ;
- basalte ;
- verre dépoli discret ;
- pierre claire ;
- métal chaud ;
- lumière indirecte.

### 2.2 SF grand public

La SF doit être immédiatement lisible, sans demander au joueur de connaitre des codes très nerdy.

Les robots doivent être :

- modulaires ;
- fonctionnels ;
- légèrement attachants ;
- robustes ;
- non humanoïdes ;
- non menaçants.

Le design peut suggérer la réplication par :

- des modules cubiques ou hexagonaux ;
- des pièces assemblables ;
- des ports mécaniques ;
- des unités de tailles différentes ;
- des motifs répétitifs de fabrication.

### 2.3 Monde vaste, interface compacte

Les images de communication peuvent montrer des paysages vastes, mais l’UI de jeu doit rester compacte et opérationnelle.

Le joueur ne manipule pas une carte complexe dans cette V0. Il gère surtout :

- des ressources ;
- des modules ;
- une file de construction ;
- des réplicateurs ;
- des améliorations ;
- quelques effets ou objectifs.

---

## 3. Direction artistique — images / key art

### 3.1 Ambiance

Les images doivent montrer une SF contemplative et aventureuse.

Références d’ambiance possibles :

- grandes vallées alien ;
- mégastructures anciennes ;
- tours minérales ;
- arches ou ruines futuristes ;
- brume basse ;
- lumière douce ;
- robots en expédition ;
- planète ou lune massive dans le ciel.

Le monde doit sembler immense, mais pas hostile. On doit sentir que les robots explorent, construisent et comprennent progressivement leur environnement.

### 3.2 Composition

Pour les fonds d’écran, key arts et visuels marketing :

- format principal : portrait 9:16 ;
- garder des zones calmes en haut et en bas pour overlays éventuels ;
- point focal lisible au tiers inférieur ou central ;
- profondeur claire : premier plan robotisé, midground d’exploration, background monumental ;
- éviter de remplir toute l’image avec du détail.

### 3.3 Robots réplicateurs

Les robots doivent avoir une silhouette simple et reconnaissable :

- corps compact, plutôt cubique ou prismatique ;
- pattes mécaniques courtes ou supports articulés ;
- optique centrale ou capteur lumineux discret ;
- matériaux : blanc cassé, gris chaud, métal usé léger ;
- accents lumineux rares : bleu pétrole, cyan très désaturé, ambre doux.

Ils ne doivent pas ressembler à :

- des mechas militaires ;
- des drones armés ;
- des insectes agressifs ;
- des robots trop mignons façon jouet enfant ;
- des terminaux cyberpunk bardés de LEDs.

### 3.4 Environnements

Types d’environnements compatibles :

- vallée rocheuse avec eau peu profonde ;
- désert minéral clair ;
- plateau basaltique ;
- ruines alien sobres ;
- mégastructure blanche ou minérale ;
- station semi-enterrée ;
- laboratoire extérieur autonome ;
- plaine brumeuse avec modules industriels.

Les formes architecturales doivent être élégantes et monumentales : arches, tours, courbes, mégastructures lisses. Éviter les tuyaux partout, les câbles visibles en excès ou les grilles techniques trop bruyantes.

---

## 4. Direction artistique — UI

### 4.1 Intention UI

L’UI doit ressembler à une interface de gestion premium, claire et tactile.

Mots-clés :

- calme ;
- lisible ;
- matérielle ;
- compacte ;
- sobre ;
- premium ;
- légèrement futuriste ;
- utilisable d’une main.

L’UI ne doit pas ressembler à :

- un cockpit ;
- un terminal militaire ;
- un tableau de bord crypto ;
- une app de minage ;
- un jeu mobile saturé en monnaies virtuelles ;
- un écran de hacker bleu fluo.

### 4.2 Structure globale d’écran

L’écran principal doit tenir autant que possible **sans scroll**, ou avec un scroll très limité. Les informations critiques doivent être visibles immédiatement.

Structure recommandée :

1. **Header compact**
   - niveau / nom de base ;
   - ressources principales ;
   - bouton secondaire discret.

2. **Carte d’état principale**
   - statut du hub ;
   - nombre de réplicateurs actifs ;
   - production globale ;
   - indicateur de rendement.

3. **Zone de gestion principale**
   - 2 à 3 cartes de production ou modules prioritaires ;
   - boutons d’amélioration compacts ;
   - jauges simples.

4. **File courte d’actions**
   - 2 éléments visibles maximum ;
   - troisième élément possible en version condensée ;
   - pas de longue liste.

5. **Modules / raccourcis**
   - 3 à 4 tuiles maximum ;
   - accès vers détails via tap.

6. **Navigation basse**
   - 4 ou 5 onglets maximum ;
   - toujours accessible au pouce.

### 4.3 Contrainte iPhone 16 / une main

Le jeu doit être confortable sur iPhone 16 en portrait.

Hypothèses :

- format cible : 9:16 ou proche ;
- zone visible typique : écran portrait avec Dynamic Island ;
- usage fréquent à une main ;
- interactions principales au pouce ;
- sessions courtes, parfois en contexte de fatigue.

Conséquences UX :

- limiter les actions importantes dans le tiers supérieur ;
- privilégier les actions dans le tiers inférieur et central ;
- éviter les boutons critiques en haut à droite ;
- éviter les menus hamburger en haut ;
- ne pas dépendre d’un scroll long ;
- préférer des cartes condensées ouvrant des panneaux de détail ;
- garder les boutons fréquents proches du bas ;
- conserver une navigation basse persistante.

### 4.4 Zones d’interaction

#### Zone haute — consultation

La zone haute sert surtout à afficher :

- ressources ;
- nom de base ;
- niveau ;
- état général ;
- résumé de production.

Les interactions y sont secondaires :

- infos ;
- détails ;
- ajout très occasionnel ;
- aide contextuelle.

Éviter d’y placer :

- action principale ;
- validation urgente ;
- amélioration fréquente ;
- bouton de construction principal.

#### Zone centrale — décision

La zone centrale contient les cartes que le joueur consulte et compare.

Exemples :

- production ;
- rendement ;
- file de construction ;
- état des réplicateurs ;
- modules actifs.

Les cartes doivent être tappables, avec un retour visuel clair.

#### Zone basse — action

La zone basse est la zone d’action privilégiée.

Elle contient :

- navigation ;
- actions principales ;
- boutons de confirmation ;
- accès build / units / research ;
- raccourcis contextuels.

Les actions fréquentes doivent être atteignables au pouce sans repositionner la main.

---

## 5. Palette couleur

La palette doit avoir deux thèmes cohérents : light mode et dark mode.

Le dark mode est important, car le jeu doit pouvoir être joué confortablement la nuit. Il ne doit pas être noir pur ni très contrasté : viser un dark mode doux, lisible et non agressif.

### 5.1 Light mode — Ceramic Expedition

| Usage | Nom | Hex |
|---|---|---:|
| Background principal | Porcelaine chaude | `#F4F1EA` |
| Surface / cards | Blanc minéral | `#FBFAF6` |
| Surface secondaire | Gris calcaire | `#E8E3D8` |
| Bordures fines | Gris pierre | `#D2CBC0` |
| Texte principal | Graphite profond | `#202426` |
| Texte secondaire | Gris titane | `#69706F` |
| Accent principal | Bleu pétrole désaturé | `#2E5F68` |
| Accent secondaire | Sauge froide | `#7E927F` |
| Action / highlight | Ambre doux | `#C9954A` |
| Succès | Vert olive calme | `#6E8B5F` |
| Danger | Rouge argile | `#B36A5E` |

### 5.2 Dark mode — Basalt Observatory

| Usage | Nom | Hex |
|---|---|---:|
| Background principal | Basalte bleuté | `#151A1C` |
| Surface / cards | Ardoise profonde | `#20282B` |
| Surface secondaire | Titane sombre | `#2A3336` |
| Bordures fines | Gris acier | `#3A4548` |
| Texte principal | Ivoire froid | `#ECE8DF` |
| Texte secondaire | Gris brume | `#A7AEA9` |
| Accent principal | Bleu pétrole doux | `#6F9CA4` |
| Accent secondaire | Sauge minérale | `#91A08D` |
| Action / highlight | Or champagne | `#D0A35F` |
| Succès | Vert lichen | `#8FA878` |
| Danger | Corail poussiéreux | `#C07A6F` |

### 5.3 Règles d’utilisation couleur

- Les couleurs neutres doivent dominer.
- Les accents doivent être rares.
- Le bleu/cyan lumineux est réservé aux petites LEDs des robots ou aux indicateurs très ponctuels.
- Les boutons principaux utilisent l’ambre/or champagne.
- Les jauges utilisent le bleu pétrole désaturé.
- Les états positifs utilisent olive / lichen.
- Les alertes utilisent argile / corail, uniquement si nécessaire.

Ratio recommandé :

- 70 % neutres ;
- 20 % surfaces secondaires / bordures ;
- 7 % accents froids ;
- 3 % accents chauds.

---

## 6. Boutons et composants

### 6.1 Boutons principaux

Usage : action à forte valeur ou action recommandée.

Exemples :

- construire ;
- améliorer ;
- lancer une production ;
- assigner un réplicateur.

Style :

- fond ambre doux / or champagne ;
- texte graphite ou basalte ;
- coins arrondis modérés ;
- pas de glow ;
- légère ombre ou relief ;
- hauteur confortable au pouce.

### 6.2 Boutons secondaires

Usage : action fréquente mais non critique.

Style :

- fond surface secondaire ;
- bordure fine ;
- texte accent principal ;
- icône simple optionnelle.

### 6.3 Boutons tertiaires

Usage : détails, info, options.

Style :

- texte seul ;
- petite icône ;
- pas de contour lourd ;
- jamais dominant.

### 6.4 Cartes

Les cartes sont le composant principal de l’UI.

Style :

- coins arrondis ;
- bordure fine ;
- fond légèrement différencié ;
- hiérarchie claire ;
- icône simple ;
- titre court ;
- valeur principale forte ;
- micro-jauge si utile.

Les cartes doivent éviter les contenus longs. Une carte doit idéalement répondre à une question simple :

- combien ?
- dans quel état ?
- est-ce améliorable ?
- quelle action possible ?

### 6.5 Jauges

Les jauges doivent être sobres.

Types recommandés :

- barre horizontale fine ;
- anneau partiel ;
- segments courts ;
- points d’état.

Éviter :

- grosses jauges fluo ;
- anneaux multiples ;
- animations agressives ;
- couleurs arc-en-ciel.

---

## 7. Iconographie

Les icônes doivent être simples, presque monochromes.

Style :

- traits clairs ;
- volumes très simplifiés ;
- faible contraste interne ;
- accent coloré minime ;
- cohérence géométrique.

Familles d’icônes :

- énergie ;
- matériau ;
- donnée ;
- unité ;
- hub ;
- module ;
- recherche ;
- stockage ;
- objectif ;
- effet actif.

Éviter :

- icônes trop détaillées ;
- pictos flashy ;
- gemmes multicolores ;
- pictogrammes fantasy ;
- badges trop récompense-casino.

---

## 8. Typographie

Objectif : lisible, moderne, légèrement technique mais pas froide.

Recommandations :

- sans-serif contemporaine ;
- chiffres très lisibles ;
- hiérarchie claire ;
- peu de capitales longues ;
- éviter les polices trop sci-fi.

Exemples de familles adaptées :

- SF Pro ;
- Inter ;
- IBM Plex Sans ;
- Söhne-like ;
- Avenir Next ;
- Geist.

Règles :

- titres de sections en petites capitales possibles, mais espacées modérément ;
- valeurs numériques grandes et nettes ;
- labels courts ;
- texte descriptif limité.

---

## 9. Layout mobile recommandé

### 9.1 Objectif anti-scroll

L’écran principal doit pouvoir être utilisé sans scroll dans la majorité des cas.

S’il y a scroll :

- il doit être léger ;
- il ne doit pas cacher une action critique ;
- la navigation basse reste fixe ;
- les actions importantes restent accessibles.

### 9.2 Densité d’information

Chaque écran doit avoir un rôle précis.

Écran Home / Hub :

- état global ;
- ressources principales ;
- 1 action recommandée ;
- file courte ;
- modules clés.

Écran Build :

- liste de constructions disponibles ;
- filtre simple ;
- action en bas ;
- détails en bottom sheet.

Écran Units :

- nombre de réplicateurs ;
- affectations ;
- missions courtes ;
- états.

Écran Research :

- recherches disponibles ;
- progression ;
- choix limités ;
- pas d’arbre gigantesque en V0.

Écran Store :

- à traiter avec prudence ;
- éviter l’impression “gem shop” ;
- si présent, style sobre et non agressif.

### 9.3 Bottom sheets

Les détails complexes doivent s’ouvrir dans des bottom sheets plutôt que dans des écrans longs.

Bon usage :

- détail d’un module ;
- choix d’amélioration ;
- assignation de réplicateurs ;
- confirmation d’action ;
- comparaison rapide.

La bottom sheet doit avoir :

- titre clair ;
- résumé ;
- 1 action principale ;
- 1 action secondaire maximum ;
- fermeture facile.

---

## 10. Accessibilité et confort nocturne

### 10.1 Dark mode

Le dark mode doit être le mode principal de confort nocturne.

Règles :

- pas de noir pur ;
- pas de blanc pur ;
- contrastes suffisants mais doux ;
- réduire les halos ;
- limiter les grandes surfaces lumineuses ;
- éviter les animations clignotantes ;
- permettre un mode “dim” si possible.

### 10.2 Taille tactile

Recommandations :

- cibles tactiles fréquentes : au moins 44 × 44 px CSS ;
- boutons principaux : plus grands si possible ;
- espacement suffisant entre actions ;
- éviter les petites icônes seules pour les actions importantes.

### 10.3 Lisibilité

- taille minimale raisonnable pour les labels ;
- chiffres de ressources lisibles ;
- pas de texte important sur image complexe ;
- pas d’information critique uniquement par couleur.

---

## 11. Animation et feedback

Animations courtes, discrètes, matérielles.

Exemples :

- carte qui s’élève légèrement au tap ;
- bouton qui s’enfonce subtilement ;
- jauge qui progresse doucement ;
- halo très léger sur statut positif ;
- micro vibration possible sur validation.

Éviter :

- explosions ;
- confettis systématiques ;
- pulsing permanent ;
- grosses transitions 3D ;
- effets lumineux trop fréquents.

---

## 12. Do / Don’t

### Do

- Faire sobre, tactile, premium.
- Utiliser des neutres chaleureux.
- Réserver la lumière aux informations importantes.
- Garder les actions au pouce.
- Montrer des robots modulaires mais simples.
- Préférer les bottom sheets aux écrans longs.
- Rendre chaque carte immédiatement compréhensible.

### Don’t

- Faire une UI cyan fluo.
- Mettre des boutons partout en haut de l’écran.
- Créer un cockpit complexe.
- Multiplier les ressources visibles.
- Faire une boutique de gemmes visuellement agressive.
- Utiliser une carte du monde en écran principal.
- Rendre les robots trop militaires ou trop insectoïdes.
- Dépendre d’un scroll long pour les actions courantes.

---

## 13. Tokens CSS de départ

```css
:root {
  --bg: #F4F1EA;
  --surface: #FBFAF6;
  --surface-2: #E8E3D8;
  --border: #D2CBC0;

  --text: #202426;
  --text-muted: #69706F;

  --accent: #2E5F68;
  --accent-soft: #7E927F;
  --action: #C9954A;

  --success: #6E8B5F;
  --danger: #B36A5E;
}

[data-theme="dark"] {
  --bg: #151A1C;
  --surface: #20282B;
  --surface-2: #2A3336;
  --border: #3A4548;

  --text: #ECE8DF;
  --text-muted: #A7AEA9;

  --accent: #6F9CA4;
  --accent-soft: #91A08D;
  --action: #D0A35F;

  --success: #8FA878;
  --danger: #C07A6F;
}
```

---

## 14. Résumé exécutable

Le rendu cible est une **interface mobile SF de gestion légère**, élégante et confortable, où l’on sent un univers d’exploration robotique sans tomber dans le tableau de bord néon.

La priorité UX est claire :

> **jouable d’une main sur iPhone 16, avec les actions importantes en zone basse, peu de scroll, et une hiérarchie ultra lisible.**

La priorité DA :

> **SF premium, sobre, minérale, tactile — des robots réplicateurs dans un monde immense, mais une interface calme et humaine.**
