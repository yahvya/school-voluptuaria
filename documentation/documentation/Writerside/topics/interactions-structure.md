# Structure des interactions

## Fonctionnement général

<code-block lang="d2">
        user: Utilisateur {
            shape: person
            width: 60
            height: 60
        }
        apps: Applications {
            MOBILE
            WEB
        }
        api: API{
            width: 200
            height: 200
            shape: parallelogram
            style: {
                font-size: 28
              }
        }
        database: Base de données{
            shape: cylinder
        }
        api_process: Processus {
            api: Processus de l'api
            maps_api: Google Maps Place API
            weather_api: OpenWeatherMap API
            api -> maps_api: 1. Demande données de lieux
            maps_api -> api: 2. Données de lieux
            api -> weather_api: 3 . Demande données météos (via 2.)
            weather_api -> api: 4 . Données météos
        }
        user -> apps:Action
        apps -> user:Résultat
        apps -> api: Requête
        api -> api_process: Demande de données
        api_process -> apps: Données
        api_process -> database: Enregistrement
        api -> apps: Réponse (données formatées)
        api -> database: Demande de données 
        database -> api: Données
    </code-block>

## Récupération des données à partir d'un réseau social

<code-block lang="d2">
        user: Utilisateur {
            shape: person
            width: 60
            height: 60
        }
        apps: Applications {
            MOBILE
            WEB
        }
        api: API{
            width: 200
            height: 200
            shape: parallelogram
            style: {
                font-size: 28
              }
        }
        api_process: Processus de synchronisation {
            database: Base de données{
                shape: cylinder
            }   
            api: Processus de l'api
            social_medias_apis: API des réseaux sociaux {
                Instagram
            }
            api -> social_medias_apis: 1. Demande des données
            social_medias_apis -> api: 2. Données utilisateurs
            api -> database: 3. Formatage et stockage
        }
        user -> apps:Action sur un réseau
        apps -> user:Résultat
        apps -> api: Requêtes
        api -> api_process: Appel
        api_process -> api: Résultat
        api -> apps: Réponses
    </code-block>