import express from "express"
import open from "open"
import axios from "axios"

async function loadDatasFromCode(code){
    const form = new FormData()

    form.append("client_id",process.env.INSTAGRAM_APP_ID)
    form.append("client_secret",process.env.INSTAGRAM_APP_SECRET)
    form.append("code",code)
    form.append("grant_type","authorization_code")
    form.append("redirect_uri",process.env.INSTAGRAM_AUTH_URI)

    const response = await axios.post("https://api.instagram.com/oauth/access_token",form)
    const accessToken = response.data.access_token
    const userId = response.data.user_id

console.log(`
        AUTHENTIFICATION FAÎTES 
            TOKEN : ${accessToken}
            USER ID : ${userId}
`)

    const contentGetBody = {
        access_token: accessToken,
        fields: "id,caption,is_shared_to_feed,media_type,media_url,username,timestamp,thumbnail_url"
    }
    const contentGetResponse = await axios.get(`https://graph.instagram.com/me/media`,{
        params: contentGetBody
    })


    contentGetResponse.data.data.forEach(publication => {
console.log(
`
        NOUVELLE PUBLICATION
            ID : ${publication.id}
            DESCRIPTION : ${publication.caption}
            TYPE : ${publication.media_type}
            LIEN D'IMAGE : ${publication.media_url}
            TIMESTAMP DE CREATION : ${publication.timestamp}
`
)
    })
}

export async function loadInstagramDetails(){
console.log(
`
    AFFICHAGE DES DONNEES D'UN COMPTE INSTAGRAM
`
)

    let server
    const app = express()

    app.get("/validation",async (req,res) => {
        await loadDatasFromCode(req.query.code)
        await res.send("Retour sur le terminal")
        server.close()
    })

    server = app.listen(8080)

    const params = {
        "client_id" : process.env.INSTAGRAM_APP_ID,
        "redirect_uri" : process.env.INSTAGRAM_AUTH_URI,
        "scope" : "user_profile,user_media",
        "response_type" : "code"
    }

    await open(`https://api.instagram.com/oauth/authorize?${new URLSearchParams(params)}`)
}