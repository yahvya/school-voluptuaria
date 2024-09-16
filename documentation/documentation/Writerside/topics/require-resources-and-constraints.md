# Ressources nécessaires et contraintes

## Ressources nécessaires

L'application a besoin de données provenant de divers services externes :

- [Google Maps Place Api](https://developers.google.com/maps/documentation/places/web-service/overview?hl=fr) : Permet l'accès et la recherche de lieux catégorisés touristique
- [Instagram Graph Api](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-facebook-login) : Permet l'accès aux posts instagram de l'utilisateur afin d'en récupérer les lieux d'intérêts
- [OpenWeatherMap](https://openweathermap.org/api) : Permet de récupérer les informations météos d'un lieu

## Contraintes évaluées en amont de la réalisation du projet

La dépendance aux apis externes pour le bon fonctionnement de l'application crée deux problèmes potentiels :

- Une potentielle baisse de performance par rapport au cas où les données provenaient des serveurs de l'application
- Un potentiel crash de l'application dans les cas où les services externes majeures comme (Google Map) auraient des problèmes

Une deuxième contrainte vient de la limitation des réseaux sociaux / applications externes de récupérer les données de l'utilisateur pourtant nécessaire à la construction d'un profil d'intérêt. 