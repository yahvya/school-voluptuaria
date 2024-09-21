import axios from "axios";

function printPlace(place){
console.log(
`
    AFFICHAGE DES DONNEES D'UN LIEU
    
        LIEU : ${place.displayName.text}
        IDENTIFIANT : ${place.id}
        CATEGORISATIONS : ${place.types.join(",")}
        NUMERO DE TELEPHONE : ${place.internationalPhoneNumber ?? "Non fourni"}
        ADRESSE COMPLETE : ${place.formattedAddress}
        COORDONNES UTILISABLE PAR L'APPLICATION : ${JSON.stringify(place.location)}
        NOTE DE L'ENDROIT : ${place.rating}
        URL D'OUVERTURE SUR GOOGLE MAPS : ${place.googleMapsUri}
        OK POUR LES ENFANTS ? : ${place.goodForChildren ? "Oui" : "Non"}
        ON PEUT Y ACCEDER EN FAUTEUIL ? : 
            PARKING : ${place.accessibilityOptions.wheelchairAccessibleParking ? "Oui" : "Non"}
            ENTREE : ${place.accessibilityOptions.wheelchairAccessibleEntrance ? "Oui" : "Non"}
            REPOS : ${place.accessibilityOptions.wheelchairAccessibleRestroom ? "Oui" : "Non"}
        INFORMATIONS SUR LES DATES D'OUVERTURE COMMUNES :
`)

    place.regularOpeningHours.weekdayDescriptions.forEach(description => console.log(`\t\t\t${description}`))

console.log(
`
        EST OUVERT MAINTENANT : ${place.regularOpeningHours.openNow ? "Oui" : "Non"}
        LES PHOTOS SONT FOURNIS VIA DES LIENS VERS UNE AUTRE API. EXEMPLE
            ${place.photos[0].name}
        QUELQUES COMMENTAIRES :
`
)

    place.reviews.forEach(review => {
console.log(
`
            COM :
                MOMENT DE PUBLICATION GENERAL : ${review.relativePublishTimeDescription} 
                MOMENT DE PUBLICATION PRECIS : ${review.publishTime} 
                TEXTE : ${review.text.text}
`
)
    })
}

export async function loadSomePlacesFromCategories(...categories){
console.log(
`
TEST DE RECUPERATION DE LIEUX DE TYPES <${categories.join(",")}>
    https://developers.google.com/maps/documentation/places/web-service/text-search?hl=fr
    
    PARAMETRAGE DE LA RECHERCHE:
        - Retour en français
        - Minimum deux étoiles sur le lieu
        - 5 résultats maximum par page
`
)

    const requestUri = "https://places.googleapis.com/v1/places:searchText"
    const headers = {
        "X-Goog-Api-Key": process.env.GOOGLE_MAP_PLACE_API_KEY,
        "X-Goog-FieldMask": "*",
        "Content-Type" : "application/json"
    }
    const body = {
        textQuery : categories.join(" ou "),
        languageCode: "fr",
        minRating: 2,
        pageSize: 5
    }
    const config = {
        headers: headers
    }

    const response = await axios.post(requestUri,body,config)

    response.data.places.forEach(place => printPlace(place))

console.log(
`
FIN DU TEST
`
)
}