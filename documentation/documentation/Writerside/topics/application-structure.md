# Découpage de l'application

## Structure

<code-block lang="d2">
    api: Api
    mobile_apps: Applications mobile (android / ios)
    web_app: Application web

    api <-> mobile_apps
    api <-> web_app
</code-block>

L'application est structuré de manière à avoir une Api centrale permettant de fournir les services aux différents déploiements de l'application.

Cette structure présente deux avantages majeurs :

- Les services étant fourni par un élément la maintenance en est plus simple via le format unifié des données
- Le développement d'un nouveau déploiement (par exemple logiciel) en est plus simplifié, car seule l'interface serait à développer. Interface qui elle pourrait se brancher sur les routes de l'API.

## Choix des technologies

**L'un des critères majeurs dans chacun des choix est le temps prévu initialement pour la réalisation du projet** donc une contrainte de temps.

### Design graphique

**Choix : Figma**

Le choix s'est orienté sur figma car il intègre toutes les fonctionnalités requises par notre projet :
- Gestion d'équipe
- Design sur plusieurs configurations de support différent (notre projet requiert du support web et mobile)
- Assets réutilisable permettant un gain de temps durant le design
    
### Front end

**Choix : Flutter**

Les critères définis pour le choix de la technologie utilisé pour le front-end sont :

1. la possibilité de faire du multi os (android / ios)
2. la possibilité de personnaliser le design
3. la possibilité de faire du multi plateforme (web et mobile) ***(niveau d'importance moindre)***
4. la fiabilité de l'outil (documentation, maintenance)
5. les performances de l'outil 
6. le temps de développement

Technologies respectant ces critères (numéros associés aux critères) :

| Technologies | 1 | 2 | 3                                                                        | 4 | 5                                           | 6 | Points |
|--------------|---|---|--------------------------------------------------------------------------|---|---------------------------------------------|---|--------|
| Flutter      | 1 | 1 | 3 (propose nativement)                                                   | 1 | 4 (conversion native)                       | 1 | 11     |
| ReactNative  | 1 | 1 | 1 (nécessite l'utilisation de react native for web pour la "conversion") | 1 | 3 (barrière javascript)                     | 1 | 8      |
| IonicAngular | 1 | 1 | 2 (propose nativement)                                                   | 1 | 1 (barrière javascript / rendu via WebView) | 1 | 7      |

Basé sur le système de points, liés aux critères que nous avons jugés important pour le projet flutter s'avérait être la technologie la plus adaptée.

### Back end

**Choix : NestJs**

Le premier choix au niveau de la technologie se base sur la charge attendue par l'application. L'application selon les prévisions est une application à utilisation ponctuelle, c'est-à-dire que ce n'est pas une application dans l'objectif d'être utilisé tous les jours toute la journée.

Malgré ce fait, la structure sous forme d'api peut mener et doit être prévu pour supporter pas mal de connexions simultanées.

Aujourd'hui NodeJs est le plus adapté à ce genre de cas dû à son système asynchrone non bloquant.

Parmi les technologies NodeJs adapté à la création d'Apis REST :

- ExpressJs
- FeathersJs
- AdonisJs
- NestJs

Nous avons décidé d'éliminer ExpressJs dû à sa base très minimaliste (contrainte de temps).

Concernant les ous sommes basés sur les critères suivants :

1. la fiabilité de l'outil (documentation, maintenance)
2. le temps de développement
3. les performances de l'outil

Chacune de ses technologies est équivalent, dû au fait d'être construit sur les mêmes bases malgré tout l'architecture modulaire de NestJs semble plus approprié pour les besoins du projet et une évolutivité future, ainsi que sa performance.

## Base de données

**Choix MongoDb**

Les besoins au niveau de la base de données sont :

- grosse quantité de données dû à la récupération de données de tailles exponentielles (en rapport avec la construction de profil des utilisateurs) et performances sur l'utilisation de ces données
- non nécessité de relation entre les données (le tout pouvant être regroupés sous forme de structure utilisateur)
- gestion de l'augmentation de charge
- flexibilité au niveau de la structure des données

Basé sur ces critères une base de données NoSql est plus adapté dû à la structuration ne nécessitant pas forcément des relations, le principe de scalabilité horizontale nativement offert sur la majeure partie des bases qui permet de faciliter la gestion de la charge, et une structure plus flexible dû à l'absence du côté "relationnel".

Notre choix s'est porté sur MongoDb dû à structure JSON autorisant la flexibilité, sa manière de faire des requêtes permettant la greffe d'outils externes pour les potentiels calculs.

D'autres candidats comme **cassandra** sont également adaptés, mais intègrent des fonctionnalités non nécessaires au projet.

## Récapitulatif des technologies

- **Design graphique** : Figma
- **Front end** : Flutter
- **Back end** : NestJs
- **Base de données** : MongoDb

