const urlBackend = "http://localhost:8080"
const urlBackendFrontend = "http://localhost:3000"
module.exports = {
    urlBackend: urlBackend,
    urlFrontend2: urlBackendFrontend,
    rankings: (bracket, region, page, name) => 
        `${urlBackend}/brawlhalla/rankings/${bracket}/${region.toLowerCase()}/${page}?name=${name}`
    ,
    rankingsPages: (bracket, region, page) => `${urlBackend}/brawlhalla/rankings/${bracket}/${region.toLowerCase()}/${page}`,
    steamLogin: () => `${urlBackend}/api/auth/steam/login`,
    steamVerify: () => `${urlBackend}/api/auth/steam/verify`,
    brawlhallaSearch: (steamId) => `${urlBackend}/brawlhalla/search/${steamId}`,
    playerStats: (brawlId) => `${urlBackend}/brawlhalla/player/${brawlId}/stats`,
    playerRanked: (brawlId) => `${urlBackend}/brawlhalla/player/${brawlId}/ranked`,
    clans: (clanId) => `${urlBackend}/brawlhalla/clan/${clanId}`,
    legends: (legendId) => `${urlBackend}/brawlhalla/legend/${legendId}`,
    allLegends: () => `${urlBackend}/brawlhalla/legend/all`,
    retrieveData: (brawlhallaId) => `${urlBackend}/brawlhalla/retrievePlayerData?brawlhalla_id=${brawlhallaId}`,
    createUser: () => `${urlBackend}/users/createUser`,
    deleteUser: (steamId) => `${urlBackend}/users/deleteUser/${steamId}`,
    updateUser: () => `${urlBackend}/users/updateUser`,
    getUser: () => `${urlBackend}/user`
}