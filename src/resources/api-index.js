const url = "http://localhost:8080"
const url2 = "http://localhost:3000"
const apiKey = "api_key=1XP8NLHKTXVUK5K5ZPFQ"
const steamKey = "B4CCEA866113E80126BBFAE55EB096CB"
module.exports = {
    url: url,
    url2: url2,
    rankings: (bracket, region, page, name) => 
        `${url}/brawlhalla/rankings/${bracket}/${region.toLowerCase()}/${page}?name=${name}`
    ,
    rankingsPages: (bracket, region, page) => `${url}/brawlhalla/rankings/${bracket}/${region.toLowerCase()}/${page}`,
    steamLogin: () => `${url}/steam/login`,
    steamVerify: () => `${url}/steam/verify`,
    brawlhallaSearch: (steamId) => `${url}/brawlhalla/search/${steamId}`,
    playerStats: (brawlId) => `${url}/brawlhalla/player/${brawlId}/stats`,
    playerRanked: (brawlId) => `${url}/brawlhalla/player/${brawlId}/ranked`,
    clans: (clanId) => `${url}/brawlhalla/clan/${clanId}`,
    legends: (legendId) => `${url}/brawlhalla/legend/${legendId}`,
    allLegends: () => `${url}/brawlhalla/legend/all`,
    retrieveData: (brawlhallaId) => `${url}/brawlhalla/retrievePlayerData?brawlhalla_id=${brawlhallaId}`,
    createUser: () => `${url}/users/createUser`,
    deleteUser: (steamId) => `${url}/users/deleteUser/${steamId}`,
    updateUser: () => `${url}/users/updateUser`
}