# Nom du projet

- [ ] Exploreasy
- [ ] Tourista
- [ ] Turisimu
- [ ] voluptuaria (tourisme en latin)

# Idées des fonctionnalités

- [X] Application mobile (pouvant être web)
- [X] Dans le but de faciliter le tourisme
- [X] Peut être utilisé avec et sans (login)

## Fonctionnalités en n'ayant pas de compte

- [X] Rechercher rapidement dans un endroit sous forme de (cartes / liste), les lieux de :
  - repos
  - visites
  - pour manger
- [X] Voir les zones à risque en fonction basé sur la météo du lieu

## Fonctionnalités en ayant un compte

> Les fonctionnalités sans compte sont héritées.

- [X] Construction de recommandations de visites basée sur le profil d'intérêt construit de l'utilisateur ou via les lieux les mieux notés (choix par l'utilisateur)
- [X] Proposition de parcours de visite à partir :
  - du profil construit et / ou lieux les mieux notés (choix par l'utilisateur).
  - du budget
  - du temps dans le lieu
  - en fonction de préférence de types
- [X] Noter un lieu ou un parcours proposé 

# Construction d'un profil

## Construction à vide

Construction du profil d'intérêt à partir :

- du type d'endroit souvent visité
- des notes attribuées aux lieux visités

## Construction à partir des réseaux sociaux

- À partir des posts de lieux postés sur les réseaux pouvant être utilisé par l'application
- À partir des posts amis
- Etablir une similarité entre les utilisateurs (celà permet de proposer à l'utilisateur B des lieux que l'utilisateur A vient de visiter et qu'il a aimé)

### Liste des réseaux gérés par l'application

- Instagram

## Idées des technologies :

### Front end

- [X] Figma pour le design
- [X] [Flutter](https://docs.flutter.dev/) dû à 
  - sa courbe rapide
  - sa possibilité de faire du multi OS et du multi plateforme

### Back end

- [X] Organisé sous forme d'API de manière à pouvoir être appellé par chacun des différents déploiements
- [X] Node Js dû à sa gestion des requêtes et le côté asynchrone (choix du framework à déterminer)
  - [X] [Adonis Js](https://docs.adonisjs.com/guides/preface/introduction)
  - [ ] Express Js
- Api utiles :
  - [Instagram Api Graph](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-facebook-login) pour l'accès aux données instagram (meta données des publications)
  - [OpenWeatherMap](https://openweathermap.org/api) pour l'interaction avec la météo
  - [Google Map Places Api](https://developers.google.com/maps/documentation/places/web-service/overview?hl=fr) pour les recherches de lieux

### Base de données

- [X] MongoDb : pour un système NoSql car pas besoin de relation forte et permet l'utilisation d'outils de recherche de manière plus simple

## Idées de séparation des tâches 

1. Design graphique de l'application 
2. Définition de la base de données
   - structure
   - règles d'optimisations et tests
   - faker
3. Définition des éléments de l'API
   - liens
   - paramètres attendus des liens
   - sécurité d'accès
   - documentation **postman**
4. Mise en place des différents environnements de développement
    - affectation des branches
    - création des projets
    - création des conteneurs
    - création des scripts Makefile
    - création du projet Postman Api
5. Intégration de la maquette Figma
6. Définition des patterns (existants comme personnalisés) front end et back end
7. Intégration des appels d'API au niveau du front end (avec des retours factices dans le format défini sur la documentation)
8. Implémentation des méthodes de vérification de risques sur un lieu (pays / ville / lieux plus précis)
9. Implémentation de la recherche rapide de lieu en intégrant les risques météos
10. Implémentation des classes et interfaces de description de réseaux sociaux
11. Implémentation des classes de liaison aux réseaux sociaux
12. Implémentation du login utilisateur et liaison aux réseaux sociaux
13. Implémentation des classes de gestion de procédure (abstraction globale)
14. Implémentation des classes de récupération des lieux liés à un réseau social
15. Implémentation des classes de gestion de recommandation basées sur des critères définies par des interfaces à définir
16. Implémenter la recommandation simple basée sur les notes et lieux similaires aux endroits les mieux notés
17. Implémenter la construction de parcours simple basés sur les critères définis ainsi que les notes et lieux similaires aux endroits les mieux notés
18. Implémenter la procédure de détection de similarité entre utilisateur
19. Implémenter la recommandation basée sur la similarité utilisateur
20. Implémenter la construction de parcours basée sur la similarité utilisateur 
21. Génération des documentations de mentions (légales, utilisation) ... via IA

## Idées de timing des tâches

1.1 - Design graphique de l'application **\[17/09/24 - 20/09/24\]** vitalii

1.2 - Définition de la base de données **\[17/09/24 - 27/09/24\]** yahaya

1.3 - Définition de l'api **\[17/09/24 - 20/09/24\]** ambroise

2.1 - Mise en place des différents environnements de développement **\[23/09/24 - 24/09/24\]** vitalii

3.1 - Définition des patterns front et back end **\[25/09/24 - 27/09/24\]** ambroise & vitalii

**\[21/10/24\]**

4.1 - Intégration de la maquette figma

4.1 - Intégration des appels d'Api

**\[23/11/24\]** vitalii

5.1 - Implémentation des classes de gestion de procédure **\[21/10/24 - 21/10/24\]** yahaya

6.1 - Implémentation des méthodes de vérification de risques **\[21/10/24 - 21/10/24\]** ambroise

6.2 - Implémentation de la recherche rapide de lieu en intégrant les risques météos **\[21/10/24 - 22/10/24\]** yahaya

7.1 - Implémentation des classes et interfaces de description de réseaux sociaux **\[22/10/24 - 22/10/24\]** ambroise & yahaya

8.1 - Implémentation des classes de liaison aux réseaux sociaux **\[23/10/24 - 25/10/24\]** ambroise & yahaya

9.1 - Implémentation du login utilisateur et liaison aux réseaux sociaux **\[18/11/24 - 19/11/24\]** ambroise & yahaya

10.1 - Implémentation des classes (abstraite / interface) de gestion de recommandation **\[19/11/24 - 19/11/24\]** yahaya

11.1 - Implémenter la recommandation simple basée sur les notes et lieux similaires **\[19/11/24 - 21/11/24\]** ambroise

11.2 - Implémenter la construction de parcours simple basés sur les critères définis ainsi que les notes et lieux similaires **\[19/11/24 - 22/11/24\]** yahaya

12.1 - Implémentation des classes de récupération des lieux liés à un réseau social (construction du profil) **\[25/11/24 - 26/11/24\]** ambroise

**\[26/11/24\]** ambroise & yahaya

13.1 - Implémenter la procédure de détection de similarité entre utilisateur (construction du profil) 

14.1 - Implémenter la recommandation basée sur la similarité utilisateur

14.2 - Implémenter la construction de parcours basée sur la similarité utilisateur 

**\[l'avant-dernière semaine de projet\]**

15.1 - Génération des documentations de mentions

Une semaine de marge (problèmes, préparer la présentation)

## Idées à retenir :

### Pour la recommandation dans le principe

- Définir les données utiles pour établir une similarité entre utilisateurs
  - notes données
  - lieux visités le plus souvent
  - emplacement de l'endroit...
- Etablir une similarité entre utilisateurs
  - bonnes notes attribuées à des lieux communs
  - cosinus de similarité (recherche supplémentaire à faire)
- Si un utilisateur similaire aime un endroit que l'autre n'a pas visité dans le lieu où il se trouve alors, on peut recommander ce lieu.

## Projets existants similaires

- tripadvisor
- google maps

## Outils de travail:

- Github : pour le versionnage du projet
- Github projet : pour l'attribution / le suivi des tâches
- Groupe teams (pour les appels de suivi )

## Rattachement des membres

- Chef de projet : Yahaya
- Devops : Vitalii
- Front end : Vitalii
- Back end : Ambroise - Yahaya



