# Spec — Pack d’assets UI / Icônes

**Projet :** Relais Drones
**Fichier :** `spec-icon-pack-2026-05-06.md`
**Date :** 2026-05-06
**Version :** 0.1
**Usage :** spécification de production du pack d’icônes et d’assets UI

---

## 1. Objectif du pack

Le pack doit fournir une bibliothèque d’assets UI cohérente pour :

- le gameplay ;
- la navigation ;
- les écrans de gestion ;
- les écrans d’opération / combat ;
- les écrans de récompense / loot ;
- les états système ;
- les futures maquettes UI.

Le pack doit servir à la fois :

1. de **base de production UI** ;
2. de **référence visuelle** ;
3. de **langage commun** entre game design, UI et dev.

---

## 2. Principes de design

### 2.1 Style visuel

Les assets doivent être :

- sobres ;
- lisibles à petite taille ;
- cohérents entre eux ;
- légèrement futuristes ;
- non militaires ;
- non “gamer HUD néon” ;
- compatibles light mode et dark mode.

Direction visuelle :

- formes simples ;
- volumes lisibles ;
- rendu premium ;
- faible bruit visuel ;
- accent coloré léger seulement si utile ;
- silhouette d’abord, détail ensuite.

### 2.2 Règles de rendu

#### Icônes UI standard

- style : simple, presque monochrome ;
- fond : transparent ;
- contour : fin ou semi-fin ;
- remplissage : léger ou absent ;
- accent : optionnel ;
- lisibilité forte en 24–32 px.

#### Icônes illustrées / pictos premium

Utilisées pour :

- ressources ;
- cartes ;
- structures ;
- ennemis ;
- récompenses.

Style attendu : plus riche que les glyphes UI, mais toujours compact, lisible et cohérent avec l’interface.

#### Badges / labels

Servent à afficher :

- rareté ;
- qualité ;
- niveau ;
- état ;
- type.

Format : horizontal compact, lisible, non criard.

---

## 3. Familles d’assets à produire

Le pack est découpé en **11 grandes sections**, dans l’ordre recommandé de production.

---

# Section A — Ressources & économie

## Objectif

Couvrir les ressources visibles dans l’UI.

## Assets à produire

### A1. Ressources principales

- Composants
- Blueprints

### A2. Qualités de composants

- Brut
- Stabilisé
- Calibré
- Avancé
- Exotique

### A3. Variantes utiles

- Composants génériques
- Composants niv. X+ — version badge
- Blueprint standard
- Blueprint en cours de fabrication
- Blueprint terminé

## Livrables attendus

Pour chaque asset :

- 1 version icône illustrée ;
- 1 version glyphe simple ;
- 1 badge / label si pertinent.

---

# Section B — Navigation principale

## Objectif

Figer les 5 onglets principaux.

## Assets à produire

- Base
- Opérations
- Expédition
- Répliquants
- Partie

## Variantes

- actif ;
- inactif ;
- pressé / sélectionné ;
- désactivé si besoin.

## Note

**“Partie”** doit éviter une imagerie trop martiale.

Préférer :

- noyau ;
- archive ;
- constellation ;
- genèse ;
- structure centrale.

Éviter :

- épées ;
- boucliers fantasy ;
- trophées ;
- icône de boutique.

---

# Section C — Infrastructures & éléments d’expédition

## Objectif

Couvrir les structures et éléments de progression d’expédition.

## Assets à produire

- Hub
- Foreuse
- Imprimante
- Blindage
- Reconnaissance
- Relais
- Projet Blueprint
- File de fabrication
- Construction en cours
- Amélioration disponible

## Variantes utiles

- niveau 1 / 2 / 3 si nécessaire ;
- état actif ;
- état amélioré ;
- état indisponible ;
- cap atteint.

## Note

La foreuse et l’imprimante sont centrales. Elles doivent être immédiatement reconnaissables, même en petit.

---

# Section D — Répliquants & missions

## Objectif

Couvrir les unités et leurs affectations.

## Assets à produire

### D1. Répliquants

- Répliquant générique

### D2. Missions

- Extraction
- Impression
- Ingénierie
- Exploration
- Réparation
- Transport

### D3. États

- affecté ;
- libre ;
- occupé ;
- optimisé ;
- indisponible.

## Note

Les répliquants doivent rester fonctionnels, robustes et légèrement attachants, mais non humanoïdes et non agressifs.

---

# Section E — Cartes / modules

## Objectif

Poser le langage visuel des modules du jeu.

## Sous-familles

- Énergie
- Puissance
- Refroidissement
- Réseau
- Loot

## Assets à produire

### E1. Types / familles

- Énergie
- Puissance
- Refroidissement
- Réseau
- Loot

### E2. Types de cartes

- carte générique ;
- carte ajoutée ;
- carte temporaire ;
- carte d’opération ;
- carte d’expédition ;
- carte verrouillée / non disponible.

### E3. Badges de rareté

- Commun
- Peu commun
- Rare
- Épique
- Légendaire

## Note

Les cartes doivent être lisibles dans les écrans de loot, de combat et de récompense. Leur famille doit être identifiable vite, sans dépendre uniquement de la couleur.

---

# Section F — Combat & moteur

## Objectif

Couvrir les symboles du moteur de combat.

## Assets à produire

### F1. Ressorts de calcul

- Énergie
- Puissance / +%
- Refroidissement
- Chaleur
- Réseau
- Score
- Seuil

### F2. Gestion de phase

- Phase
- Carte figée
- Carte non figée
- Relance
- Validation
- Annulation

### F3. Résultats

- Victoire
- Échec
- Succès partiel
- Récompense gagnée

## Note

Cette section est critique : elle structure la lisibilité du cœur du jeu.

Les icônes doivent être assez simples pour être vues dans :

- une carte ;
- un tooltip ;
- une ligne de détail ;
- une jauge ;
- un récap de phase.

---

# Section G — Malus d’élite & états spéciaux

## Objectif

Donner une identité visuelle claire aux malus d’élite.

## Assets à produire

- Surchauffe
- Inertie thermique
- Brouillage
- Coupure
- Verrouillage

## Variantes

- version icône seule ;
- version badge ;
- version avec cadre d’alerte.

## Note

Chaque malus doit modifier une règle identifiable :

- Surchauffe → chaleur plus punitive ;
- Inertie thermique → chaleur moins dissipée ;
- Brouillage → réseau affaibli ;
- Coupure → main réduite ;
- Verrouillage → relance réduite.

---

# Section H — Ennemis & familles visuelles

## Objectif

Créer des silhouettes de familles d’ennemis.

## Assets à produire

### H1. Familles standards

- Guetteur
- Patrouilleur
- Foreuse légère
- Intercepteur
- Sapeur
- Artillerie
- Gardien
- Perturbateur
- Dérive
- Réacteur mobile

### H2. Élites

- Elite générique
- Elite surchauffe
- Elite inertie
- Elite brouillage
- Elite coupure
- Elite verrouillage

## Note

Pas besoin de faire 30 icônes ultra distinctes tout de suite.

Pour la V0, on peut viser :

- 8 à 10 familles standard ;
- 5 élites bien différenciés.

Les drones ne doivent pas ressembler à des insectes agressifs ou à des mechas militaires.

---

# Section I — Récompenses & loot UX

## Objectif

Couvrir l’écran de récompense et ses interactions.

## Assets à produire

### I1. Types de récompense

- Composants
- Blueprint
- Carte module
- Structure gratuite
- Répliquant gratuit
- Amélioration gratuite

### I2. Interaction loot

- Glisser ici
- Zone de dépôt active
- Zone de dépôt inactive
- Emplacement d’origine
- Continuer sans récompense
- Aucun choix
- Détails / appui long
- Récompense sélectionnée

### I3. États de carte

- carte normale ;
- carte survolée / pressée ;
- carte en drag ;
- carte avec détails ouverts.

## Note UX

Les cartes de récompense sont en bas de l’écran.

Le joueur sélectionne une récompense en la faisant glisser vers une zone de dépôt située au milieu de l’écran. Cela évite les miss-clicks et garde l’action dans une zone confortable au pouce.

---

# Section J — États UI généraux

## Objectif

Avoir les états transverses de l’interface.

## Assets à produire

- Nouveau
- Disponible
- Indisponible
- En cours
- Terminé
- Verrouillé
- Déverrouillé
- Important
- Alerte
- Pas assez de ressources
- Cap atteint
- Bonus actif
- Rendement
- Danger faible
- Danger moyen
- Danger élevé

## Note

Ces états doivent être ultra lisibles, mais pas agressifs. Les alertes doivent rester rares et non criardes.

---

# Section K — Actions de gestion & boutons

## Objectif

Couvrir les actions fréquentes du joueur.

## Assets à produire

- Construire
- Améliorer
- Déplacer
- Détruire / retirer
- Détails
- Prioriser
- Lancer
- Arrêter
- Confirmer
- Annuler
- Retour
- Infos

## Variantes boutons

- principal ;
- secondaire ;
- tertiaire ;
- désactivé.

## Note

Les actions fréquentes doivent rester compatibles avec une UI mobile à une main. Les boutons principaux doivent être confortables et placés bas dans l’écran quand c’est possible.

---

## 4. Ce qui sort du pack V0

Pour garder le périmètre propre, on sort de la V0 :

- Recherche
- Données
- Composant unique
- Boutique agressive / monétisation
- Icônes trop “casino”
- Icônes fantasy
- Imagerie militaire lourde
- Drones essaims / parasites

---

## 5. Formats à produire

Pour chaque section, idéalement :

### A. Planche overview

- une image regroupant la section ;
- utile pour validation visuelle.

### B. Assets unitaires

- PNG fond transparent ;
- un fichier par icône.

### C. Variantes

- light ;
- dark si nécessaire ;
- actif / inactif si pertinent ;
- disabled si pertinent.

---

## 6. Grille de tailles recommandées

### Glyphes UI

- base : 24 px ;
- medium : 32 px ;
- large : 48 px.

### Icônes illustrées

- base : 64 px ;
- large : 96 px ;
- hero / carte : 128 px.

### Badges

- hauteur cible : 24–28 px.

---

## 7. Convention de nommage

Proposition :

```txt
rd_[section]_[name]_[variant]_[size]
```

Exemples :

```txt
rd_nav_operations_active_32
rd_res_blueprint_default_64
rd_status_locked_dark_24
rd_combat_heat_default_32
rd_loot_dropzone_active_48
rd_enemy_patrol_default_64
```

Sections courtes :

- `res`
- `nav`
- `infra`
- `rep`
- `card`
- `combat`
- `elite`
- `enemy`
- `loot`
- `status`
- `action`

---

## 8. Ordre de production recommandé

### Phase 1 — indispensable UI

1. Ressources & qualités
2. Navigation
3. Actions générales
4. États UI

### Phase 2 — gameplay core

5. Combat & moteur
6. Cartes / modules
7. Loot UX

### Phase 3 — progression

8. Infrastructures
9. Répliquants & missions
10. Récompenses

### Phase 4 — contenu

11. Ennemis
12. Élites

---

## 9. Critères de validation

Une section est validée si :

- elle est cohérente visuellement ;
- elle est lisible en petit ;
- elle fonctionne en light mode ;
- elle fonctionne en dark mode ou peut être facilement adaptée ;
- elle ne jure pas avec le reste ;
- elle couvre bien les besoins V0 ;
- elle ne contient pas d’assets obsolètes.

---

## 10. Checklist de pilotage

```md
- [ ] Section A — Ressources & économie
- [ ] Section B — Navigation
- [ ] Section C — Infrastructures
- [ ] Section D — Répliquants & missions
- [ ] Section E — Cartes / modules
- [ ] Section F — Combat & moteur
- [ ] Section G — Malus d’élite
- [ ] Section H — Ennemis & familles
- [ ] Section I — Récompenses & loot UX
- [ ] Section J — États UI
- [ ] Section K — Actions & boutons
```

---

## 11. Version ultra-courte

```md
Pack V0 à produire :
1. Ressources
2. Navigation
3. Infrastructures
4. Répliquants
5. Cartes
6. Combat
7. Malus élite
8. Ennemis
9. Loot UX
10. États UI
11. Actions

Périmètre V0 :
- pas de recherche
- pas de données
- pas de composant unique
- pas de boutique agressive
- pas de drones essaims / parasites

Ordre recommandé :
Ressources → Navigation → Actions → États → Combat → Cartes → Loot → Infrastructures → Répliquants → Ennemis
```
