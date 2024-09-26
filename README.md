# Projet master 2 non alternants

## Membres :

- Bathily Yahaya
- Kilimou Ambroise
- Renkas Vitalii
- Vigneau Pierlovisi Pascal

## Description du projet

> Application mobile pour la gestion du tourisme

## Informations du projet

- Date de début : 11-09-2024
- Version actuelle : 11.09.24
- Nom du projet dans la version courante : Voluptuaria

## Règles de fonctionnement

### Logique des commentaires

- Commentaires en anglais
- Commenter chaque fonction
    - But de la fonction
    - Lien vers les ressources de documentations externes si nécessaire
    - Description des paramètres
- Classes au format [psr-4](https://en.wikipedia.org/wiki/PHP_Standard_Recommendation) *même hors contexte PHP*
- Les paramètres des fonctions doivent être définies sous forme d'un objet, de manière à pouvoir nommer les paramètres
- Se plier aux patterns définis
- Avant de reprendre son code faire un pull de sa branche 

### Scripts utilitaires

- Définir des scripts Makefile pour chaque point de lancement (*ces scripts doivent permettre à un autre membre n'ayant pas de connaissance sur la partie concernée de lancer le projet*)
- Configuration sous forme de conteneur si possible

## Structure des branches

> Chaque branche est contenue dans un dossier du même nom.

- **main** : branche principale, contient des versions utilisables des éléments
- **documentation** : branche de documentation du projet
- **shared-documents** : branche de gestion des documents du projet
- **tests** : branche de stockage des différents tests menés
- **front-end** : branche de développement du front end de l'application
- **api** : branche de développement de l'api
- **database** : branche de structuration et développement de la base de données

## Version du projet

> Le dossier "versions" contient des dossiers représentant les versions d'un projet

- **nommage** : date de la version
- **contenu** : élements executable 