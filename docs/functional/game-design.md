# Game design fonctionnel

## Pitch

`Relais Drones` est un roguelite web mobile portrait, non temps reel, concu pour des sessions courtes a une main.

Le joueur dirige une base de drones autonomes qui explore des zones infectees. Chaque vague se resout par un mini-jeu de tirage, garde et relance de modules. Le joueur construit un score, gere la chaleur, investit dans le reseau, puis choisit s'il securise son loot ou continue pour un multiplicateur plus eleve.

## Piliers V0

### Jouable a une main

- Interface portrait.
- Grandes tuiles de modules.
- Actions principales en bas d'ecran.
- Pas de temps reel.
- Une decision principale a la fois.

### Interessant sans etre fatigant

- Les seuils de neutralisation et purification sont visibles.
- Le score previsionnel est affiche.
- Les combos sont courts.
- Les ressources de vague sont limitees a energie, chaleur, reseau, purification et loot.

### Echec non sterile

- Le joueur peut rentrer apres chaque vague reussie.
- Une run echouee perd le loot non securise.
- La production passive des drones est toujours accordee a la fin d'une run.

### Roguelite d'abord

La base donne une progression meta simple, mais le coeur du jeu reste la run.

## Boucle globale

1. Choisir une expedition depuis la base.
2. Affronter une suite de vagues.
3. Pour chaque vague, jouer 3 cycles de modules.
4. Atteindre le seuil de neutralisation.
5. Eventuellement atteindre le seuil de purification.
6. Apres une vague reussie, choisir entre continuer ou rentrer.
7. Rentrer securise le loot avec le multiplicateur courant.
8. Continuer augmente le multiplicateur potentiel mais risque de perdre le loot non securise.
9. Depenser les composants a la base pour acheter des ameliorations.

## Structure d'une vague

Chaque vague represente un drone corrompu a neutraliser ou purifier.

Un ennemi possede :

- un seuil de neutralisation ;
- un seuil de purification ;
- un loot de base ;
- un effet special optionnel.

Resultats possibles :

- score final inferieur au seuil de neutralisation : echec ;
- score final superieur ou egal au seuil de neutralisation : vague reussie ;
- score de purification superieur ou egal au seuil de purification : drone purifie.

## Structure d'un cycle

Chaque vague contient 3 cycles.

Dans chaque cycle :

1. le jeu tire 5 modules ;
2. le joueur garde jusqu'a 3 modules ;
3. le joueur peut relancer les modules non gardes ;
4. le joueur valide le cycle ;
5. les modules selectionnes sont appliques.

Une relance est disponible par vague par defaut. Certaines ameliorations ou paliers reseau peuvent en ajouter.

## Ressources de vague

### Energie

Ressource principale de score. Les modules energie ajoutent de l'energie brute au cycle.

### Turbo

Multiplicateur court terme. Les modules turbo augmentent fortement l'energie du cycle, mais generent de la chaleur.

### Chaleur

Risque accumule. La chaleur active reduit l'energie des cycles suivants.

Regle V0 :

- chaque point de chaleur active reduit l'energie du cycle de 5% ;
- certains ennemis augmentent cette penalite ;
- la chaleur peut etre reduite ou ignoree par certains modules ;
- apres une vague, la chaleur est reduite de moitie, sauf effet special.

### Reseau

Investissement long terme. Le reseau ne donne pas toujours de valeur immediate, mais augmente le score final de vague.

Regles V0 :

- multiplicateur de base : `1 + reseau * 0.15` ;
- a 3 reseau : bonus de multiplicateur ;
- a 5 reseau : +1 relance une fois par vague ;
- a 8 reseau : bonus de multiplicateur supplementaire.

### Purification

Score supplementaire reserve au seuil de purification. Il ne facilite pas la neutralisation.

### Loot

Certains modules augmentent le loot de vague si elle est reussie.

## Calcul de score

### Cycle

```text
energie effective = energie brute * multiplicateur turbo * penalite chaleur
```

Des effets peuvent modifier ce resultat :

- purge thermique : retire la chaleur mais reduit l'energie du cycle ;
- stabilisateur : ignore la penalite de chaleur ;
- synchro distribuee : booste les modules energie au cycle suivant ;
- postcombustion : ajoute de l'energie si le cycle genere assez de chaleur.

### Fin de vague

```text
score final = somme des energies effectives * multiplicateur reseau
score purification = score final + bonus de purification
```

Le score final est compare au seuil de neutralisation.

Le score de purification est compare au seuil de purification.

## Modules V0

Le prototype contient les familles suivantes :

- energie : score stable ;
- turbo : gros score court terme contre chaleur ;
- reseau : scaling de fin de vague ;
- refroidissement : reduction ou controle de la chaleur ;
- stabilite : mitigation de risque ;
- purification : recuperation de drones ;
- loot : greed economique ;
- parasite : pollution de tirage introduite par certains ennemis.

### Modules energie

- Cellule faible : +8 energie.
- Cellule standard : +12 energie.
- Cellule haute capacite : +18 energie.
- Batterie instable : +25 energie, +1 chaleur.

### Modules turbo

- Accelerateur leger : x1.4 energie, +1 chaleur.
- Accelerateur plasma : x1.8 energie, +2 chaleur.
- Surcharge de coeur : x2.5 energie, +4 chaleur.
- Postcombustion : x1.3 energie, bonus si le cycle genere au moins 2 chaleur.

### Modules reseau

- Noeud reseau : +1 reseau.
- Relais optique : +2 reseau avant le dernier cycle, sinon +1.
- Routage adaptatif : +1 reseau, +10 energie si reseau deja eleve.
- Synchronisation distribuee : boost des modules energie au cycle suivant.

### Modules refroidissement et stabilite

- Radiateur passif : reduit la chaleur.
- Purge thermique : retire la chaleur active mais reduit l'energie du cycle.
- Dissipateur cinetique : reduit la chaleur et transforme une chaleur elevee en energie.
- Stabilisateur : ignore la penalite de chaleur du cycle.

### Modules purification et loot

- Signal de reconnexion : score de purification.
- Paquet reparation : purification et refroidissement.
- Extracteur de composants : bonus de loot si reussite.
- Analyse noyau : reseau et bonus si purification.

### Parasites

- Parasite thermique : chaleur si garde.
- Bruit de signal : penalite de score final.

## Ennemis V0

### Drone errant

- Neutralisation : 60.
- Purification : 90.
- Effet : aucun.

### Collecteur corrompu

- Neutralisation : 80.
- Purification : 120.
- Effet : +20% loot si purifie.

### Tourelle autonome

- Neutralisation : 110.
- Purification : 150.
- Effet : la chaleur penalise plus fortement.

### Essaim parasite

- Neutralisation : 90.
- Purification : 140.
- Effet : ajoute un parasite thermique dans les tirages.

### Noyau relais

- Neutralisation : 140.
- Purification : 210.
- Effet : le reseau compte double et la chaleur peut etre conservee entierement.

## Expeditions V0

### Decharge orbitale

- Difficulte : facile.
- Vagues : Drone errant, Collecteur corrompu, Tourelle autonome.
- Role : premiere expedition et apprentissage.

### Relais K-17

- Difficulte : moyenne.
- Vagues : Collecteur corrompu, Essaim parasite, Noyau relais.
- Role : demande de comprendre chaleur, parasites et reseau.

### Serre mecanique infectee

- Difficulte : moyenne.
- Vagues : Drone errant, Essaim parasite, Collecteur corrompu, Noyau relais affaibli.
- Role : expedition orientee purification.
- Deblocage : amelioration Scan de secteur.

## Loot et multiplicateurs

Le loot gagne pendant une run reste non securise jusqu'au retour base.

Multiplicateurs V0 :

- apres vague 1 : x1 ;
- apres vague 2 : x2 ;
- apres vague 3 : x4 ;
- vague supplementaire ou expedition longue : x8 si applicable.

Le joueur peut rentrer apres chaque vague reussie. En cas d'echec ou d'abandon pendant une vague, le loot non securise est perdu.

## Meta-progression

### Composants

Ressource principale. Elle sert a acheter les ameliorations.

Sources :

- loot securise apres une run ;
- bonus de purification ;
- production passive des drones.

### Drones passifs

Chaque purification donne un drone passif potentiel, dans la limite de capacite de la base.

Chaque drone passif produit des composants a la fin d'une run :

```text
production passive = drones passifs * composants par drone
```

La production est accordee meme en cas d'echec ou d'abandon.

## Ameliorations V0

### Ameliorations de modules

- Cellules renforcees : les cellules donnent plus d'energie.
- Turbo calibre : les turbos generent moins de chaleur.
- Reseau accelere : commence chaque vague avec du reseau.
- Radiateurs ameliores : le refroidissement retire plus de chaleur.
- Reconnexion assistee : les seuils de purification baissent.

### Ameliorations de base

- Atelier de recuperation : bonus de loot en retour volontaire.
- Baie de drones : capacite max de drones passifs augmentee.
- Chaine de tri : production passive par drone augmentee.
- Scan de secteur : debloque une expedition.
- Memoire tactique : ajoute une relance par vague.

## UX V0

### Base

Affiche :

- composants ;
- drones passifs ;
- production passive par run ;
- expeditions ;
- ameliorations.

### Vague

Affiche :

- ennemi courant ;
- seuil de neutralisation ;
- seuil de purification ;
- score actuel ;
- score previsionnel ;
- chaleur ;
- reseau ;
- loot non securise ;
- cycle courant ;
- modules tires.

### Resultat de vague

Affiche :

- succes ou echec ;
- purification ou neutralisation simple ;
- score final ;
- loot actuel ;
- multiplicateur actuel ;
- prochain multiplicateur potentiel ;
- choix continuer ou rentrer.

## Conditions de victoire et d'echec

### Victoire de run

Le joueur reussit toutes les vagues de l'expedition et securise le loot final.

### Retour volontaire

Le joueur rentre apres une vague reussie et garde le loot avec le multiplicateur courant.

### Echec

Le joueur echoue une vague :

- loot non securise perdu ;
- production passive accordee ;
- retour base.

### Abandon pendant une vague

Le joueur peut revenir a la base pendant une vague :

- loot non securise perdu ;
- production passive accordee ;
- retour base.

## Objectifs de validation

La V0 est consideree prometteuse si :

1. Une vague donne envie d'etre rejouee.
2. La difference chaleur / reseau est comprise sans tutoriel lourd.
3. Le choix continuer / rentrer cree une tension nette.
4. Les composants motivent une nouvelle run.
5. La purification donne une satisfaction claire.

## Points a playtester

- Le premier set de seuils est-il trop facile avec les turbos ?
- Le reseau paye-t-il assez vite pour etre choisi ?
- La chaleur est-elle percue comme un risque interessant plutot qu'une punition ?
- Les upgrades arrivent-elles assez vite ?
- Le bouton de retour pendant une vague est-il compris comme un abandon ?
- Les tuiles de modules restent-elles lisibles sur iPhone ?

## Evolutions possibles apres V0

- Ajouter un manifeste PWA pour installation mobile.
- Introduire des drones choisis avant expedition.
- Ajouter des evenements entre vagues.
- Ajouter des familles de modules plus marquees.
- Ajouter une narration legere autour de la corruption des drones.
- Ajouter un mode expedition bonus apres la derniere vague.
