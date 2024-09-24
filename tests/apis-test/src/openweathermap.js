import axios from "axios"

export async function loadMeteoOf(longitude,latitude){
    const params = {
        lat: latitude,
        lon: longitude,
        appid: process.env.OPENWEATHER_API_KEY,
        units: "metric",
        lang: "fr"
    }
    const response = await axios.get("https://api.openweathermap.org/data/2.5/weather",{
        params: params
    })

console.log(
`
    AFFICHAGE DES DONNEES METEO DU : ${response.data.name} - Longitude : ${response.data.coord.lon} Latitude : ${response.data.coord.lat}
        
        DESCRIPTION DU TEMPS : ${response.data.weather[0].description} 
        TEMPERATURE EN DEGREE CELSIUS : ${response.data.main.temp} ° 
        TEMPERATURE EN DEGREE CELSIUS EN TERME DE RESENTI : ${response.data.main.feels_like} ° 
        PRESSION EN HECTOPASCAL : ${response.data.pressure}    
`
)
}