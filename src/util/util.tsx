interface TwoVTwoPlayerTemplate {
  brawlhalla_id_one: number,
  brawlhalla_id_two: number,
  teamname: string
}

export const calcWinRate = (games: number, wins: number): string => {
  let res =((wins / games) * 100).toFixed(2)
  if (isNaN(res)) 
    return '0';
   else
    return ((wins / games) * 100).toFixed(2);
  }

 export function capitalizeName(name: string): String {
    let names: Array<String> = name.split(" ");
    let res: String = "";
    for (let word of names) {
      let letter = String(word).charAt(0).toUpperCase();
      res += letter + String(word).slice(1) + " "
    }
      return res;
  }
  export     const getTeammate = (teammate: TwoVTwoPlayerTemplate, name: String): String =>  {
    if (teammate.brawlhalla_id_one === teammate.brawlhalla_id_two) 
      return {id: 0, name: ''};
    let teamnames = teammate.teamname.split("+");
    let player2 = {
      id: id == teammate.brawlhalla_id_one ? teammate.brawlhalla_id_two : teammate.brawlhalla_id_one, 
      name: teamnames[0] === name ? teamnames[1] : teamnames[0], }
    return player2;
  } 
  export const statsObj = {
    damagedealt:'Dmg Dealt', 
    damagegadgets: 'Gadget Dmg',
    damagetaken:'Dmg Taken', 
    damagethrownitem:'Dmg Thrown', 
    damageunarmed:'Unarmed Dmg', 
    damageweaponone: 'Weapon 1 Dmg',
    damageweapontwo: 'Weapon 2 Dmg',
    falls:'Falls',
    games:'Games',
    kogadgets: 'Gadget KOs',
    kothrownitem: 'Thrown Item KOs',
    kounarmed: 'Unarmed KOs',
    koweaponone: "KOs Weapon 1",
    koweapontwo: "KOs Weapon 2",
    level: "Lvl",
    matchtime: "Match Time",
    suicides: "Suicides",
    teamkos: "Team KOs",
    timeheldweaponone: "Time Weapon 1",
    timeheldweapontwo: "Time Weapon 2",
    wins: "Wins",
    xp: "XP earned",
    xp_percentage: "XP %"}

    export const legendWeapons = { 
      ada: {weaponone: "blasters", weapontwo: "spear"} ,
      arcadia: {weaponone: "spear", weapontwo: "greatsword"},
      artemis: {weaponone: "rocket_lance", weapontwo: "scythe"},
      asuri: {weaponone: "katars", weapontwo: "sword"},
      azoth: {weaponone: "bow", weapontwo: "axe"},
      barraza: {weaponone: "axe", weapontwo: "blasters"},
      brynn: {weaponone: "axe", weapontwo: "spear"},
      bodvar: {weaponone: "grapple_hammer", weapontwo: "sword"},
      caspian: {weaponone: "axe", weapontwo: "grapple_hammer"},
      cassidy: {weaponone: "blasters", weapontwo: "grapple_hammer"},
      cross: {weaponone: "blasters", weapontwo: "gauntlets"},
      diana: {weaponone: "bow", weapontwo: "blasters"},
      dusk: {weaponone: "spear", weapontwo: "orb"},
      ember: {weaponone: "bow", weapontwo: "katars"},
      ezio: {weaponone: "sword", weapontwo: "orb"},
      fait: {weaponone: "scythe", weapontwo: "orb"},
      gnash: {weaponone: "grapple_hammer", weapontwo: "spear"},
      hattori: {weaponone: "sword", weapontwo: "spear"},
      imugi: {weaponone: "axe", weapontwo: "greatsword"},
      isaiah: {weaponone: "cannon", weapontwo: "blasters"},
      jaeyun: {weaponone: "sword", weapontwo: "greatsword"},
      jhala: {weaponone: "axe", weapontwo: "sword"},
      jiro: {weaponone: "sword", weapontwo: "scythe"},
      kaya: {weaponone: "spear", weapontwo: "bow"},
      "king zuva": {weaponone: "grapple_hammer", weapontwo: "battle_boots"},
      koji: {weaponone: "bow", weapontwo: "sword"},
      kor: {weaponone: "gauntlets", weapontwo: "grapple_hammer"},
      "lin fei": {weaponone: "katars", weapontwo: "cannon"},
      loki: {weaponone: "katars", weapontwo: "scythe"},
      lucien: {weaponone: "katars", weapontwo: "blasters"},
      magyar: {weaponone: "grapple_hammer", weapontwo: "greatsword"},
      mako: {weaponone: "katars", weapontwo: "greatsword"},
      mirage: {weaponone: "scythe", weapontwo: "spear"},
      mordex: {weaponone: "scythe", weapontwo: "gauntlets"},
      munin: {weaponone: "bow", weapontwo: "scythe"},
      "queen nai": {weaponone: "spear", weapontwo: "katars"},
      nix: {weaponone: "scythe", weapontwo: "blasters"},
      onyx: {weaponone: "gauntlets", weapontwo: "cannon"},
      orion: {weaponone: "rocket_lance", weapontwo: "spear"},
      petra: {weaponone: "gauntlets", weapontwo: "sword"},
      priya: {weaponone: "chakram", weapontwo: "sword"},
      ragnir: {weaponone: "katars", weapontwo: "axe"},
      rayman: {weaponone: "gauntlets", weapontwo: "axe"},
      redraptor: {weaponone: "battle_boots", weapontwo: "orb"},
      reno: {weaponone: "blasters", weapontwo: "orb"},
      scarlet: {weaponone: "grapple_hammer", weapontwo: "lance"},
      sentinel: {weaponone: "grapple_hammer", weapontwo: "katars"},
      seven: {weaponone: "spear", weapontwo: "cannon"},
      sidra: {weaponone: "cannon", weapontwo: "sword"},
      "sir roland": {weaponone: "rocket_lance", weapontwo: "sword"},
      teros: {weaponone: "axe", weapontwo: "grapple_hammer"},
      tezca: {weaponone: "battle_boots", weapontwo: "gauntlets"},
      thatch: {weaponone: "sword", weapontwo: "blasters"},
      thea: {weaponone: "battle_boots", weapontwo: "rocket_lance"},
      thor: {weaponone: "grapple_hammer", weapontwo: "orb"},
      ulgrim: {weaponone: "axe", weapontwo: "rocket_lance"},
      val: {weaponone: "gauntlets", weapontwo: "sword"},
      vector: {weaponone: "rocket_lance", weapontwo: "bow"},
      vivi: {weaponone: "battle_boots", weapontwo: "blasters"},
      volkov: {weaponone: "axe", weapontwo: "scythe"},
      "lord vraxx": {weaponone: "rocket_lance", weapontwo: "blasters"},
      "wu shang": {weaponone: "gauntlets", weapontwo: "spear"},
      xull: {weaponone: "cannon", weapontwo: "axe"},
      yumiko: {weaponone: "bow", weapontwo: "grapple_hammer"},
      zariel: {weaponone: "gauntlets", weapontwo: "bow"},
      
  }
   export function simplifyNums(num) {
      let numDivide = 1000;
      let timesReduced = 0;
      while(num > 999) {
        num = num / 1000;
        timesReduced++;
      }
      if (timesReduced == 1) {
        return num.toFixed(2) + "k";
      } else if (timesReduced == 2) {
        return num.toFixed(2) + "m"
      } else if (timesReduced == 3) {
        return num.toFixed(2) + "b"
      }
      return num;
    }

export function getTier(tier) {
  return tier.split(" ")[0];
}